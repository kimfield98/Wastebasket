#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <unistd.h>
#include <string.h>
#include "mm.h"
#include "memlib.h"

team_t team = {
    "team06",
    "kim chowon",
    "kimfield98@gmail.com",
    "",
    ""
};

#define ALIGNMENT 8
#define ALIGN(size) (((size) + (ALIGNMENT-1)) & ~0x7)
#define SIZE_T_SIZE (ALIGN(sizeof(size_t)))

#define WSIZE 4
#define DSIZE 8
#define CHUNKSIZE (1<<12)
#define LISTLIMIT 20

#define MAX(x, y) ((x) > (y) ? (x) : (y))

#define PACK(size, alloc) ((size) | (alloc))
#define GET(p) (*(unsigned int *)(p))
#define PUT(p, val) (*(unsigned int *)(p) = (val))
#define GET_SIZE(p) (GET(p) & ~0x7)
#define GET_ALLOC(p) (GET(p) & 0x1)
#define HDRP(bp) ((char *)(bp) - WSIZE)
#define FTRP(bp) ((char *)(bp) + GET_SIZE(HDRP(bp)) - DSIZE)
#define NEXT_BLKP(bp) ((char *)(bp) + GET_SIZE(((char *)(bp) - WSIZE)))
#define PREV_BLKP(bp) ((char *)(bp) - GET_SIZE(((char *)(bp) - DSIZE)))

#define PRED_FREE(bp)      (*(void**)(bp))         
#define SUCC_FREE(bp)      (*(void**)(bp + WSIZE))

static char* heap_listp;
static void* segregation_list[LISTLIMIT];

static void* extend_heap(size_t words);
static void* coalesce(void* bp);
static void* find_fit(size_t asize);
static void place(void* bp, size_t newsize);
static void remove_block(void *bp);
static void insert_block(void *bp, size_t size);


int mm_init(void) {

    int list;
    
    // 모든 분할 리스트를 NULL로 초기화
    for (list = 0; list < LISTLIMIT; list++) {
        segregation_list[list] = NULL;
    }
    
    // 힙 공간을 확장하고 초기화
    if ((heap_listp = mem_sbrk(4 * WSIZE)) == (void *)-1)
        return -1;

    PUT(heap_listp, 0);                             // 정렬 패딩
    PUT(heap_listp + (1 * WSIZE), PACK(DSIZE, 1));  // 프롤로그 헤더
    PUT(heap_listp + (2 * WSIZE), PACK(DSIZE, 1));  // 프롤로그 푸터
    PUT(heap_listp + (3 * WSIZE), PACK(0, 1));      // 에필로그 헤더
        
    heap_listp += (2 * WSIZE);
    
    // 초기 빈 Heap 생성, 문제가 발생하면 -1 값을 반환
    if (extend_heap(CHUNKSIZE / WSIZE) == NULL) {
        return -1;
    }
    
    return 0;
}


void *mm_malloc(size_t size) {
    size_t asize;       // 할당할 메모리의 크기를 저장
    size_t extendsize;  // 힙 확장 크기를 저장
    char *bp;           // 블록 포인터
    
    // 요청된 크기가 0이면 NULL을 반환
    if (size == 0) {
        return NULL;
    }
    
    // 요청된 크기를 정렬하고, 오버헤드 사이즈를 더해줌
    asize = ALIGN(size + SIZE_T_SIZE);
    
    // 적절한 자유 블록을 찾았다면 그곳에 할당하고 포인터를 반환
    if ((bp = find_fit(asize)) != NULL) {
        place(bp, asize);
        return bp;
    }
    
    // 요청된 크기와 CHUNKSIZE 중 더 큰 값을 확장 사이즈로 설정
    extendsize = MAX(asize, CHUNKSIZE);
    
    // 힙 확장에 실패하면 NULL을 반환
    if ((bp = extend_heap(extendsize / WSIZE)) == NULL) {
        return NULL;
    }
    
    // 새로 확장한 공간에 메모리를 할당하고 포인터를 반환
    place(bp, asize);
    return bp;
}


void mm_free(void *bp) {
    
    // 해제할 블록의 크기를 가져옴
    size_t size = GET_SIZE(HDRP(bp));
    
    // 헤더/푸터에 블록 크기와 할당 상태를 나타냄
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));                      
    
    // 인접한 미할당 블록들과 병합
    coalesce(bp);
}


void *mm_realloc(void *ptr, size_t size) {
    
    void *oldptr = ptr; // 기존의 메모리 블록 포인터
    void *newptr;       // 새로운 메모리 블록 포인터
    size_t copySize;    // 복사할 데이터 크기를 저장
    
    // 새로운 크기의 메모리 블록을 할당
    newptr = mm_malloc(size);

    // 만약 메모리 할당에 실패하면 NULL을 반환
    if (newptr == NULL) {
        return NULL;
    }
    
    // 기존 블록의 크기를 가져옴
    copySize = GET_SIZE(HDRP(oldptr));
    
    // 요청한 크기가 기존 블록의 크기보다 작다면 요청한 크기만큼만 복사
    if (size < copySize) {
        copySize = size;
    }
    
    // 기존 블록에서 새로운 블록으로 데이터를 복사
    memcpy(newptr, oldptr, copySize);
    
    // 기존 메모리 공간을 해제
    mm_free(oldptr);
    
    // 새로 할당받은 메모리 공간의 포인터를 반환
    return newptr;
}


static void* extend_heap(size_t words) {
    
    char* bp;     // 블록 포인터
    size_t size;  // 확장할 힙의 크기
    
    // 요청된 워드 수를 기반으로 확장할 힙의 크기를 계산 (메모리 정렬 보장)
    size = (words % 2 == 1) ? (words + 1) * WSIZE : (words) * WSIZE;
    
    // 메모리 할당에 실패하면 NULL을 반환
    if ((long)(bp = mem_sbrk(size)) == -1) {
        return NULL;
    }              
    
    // 새롭게 확장된 블록의 헤더/푸터에 크기와 할당 상태를 저장
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));
    // 새롭게 추가된 블록 바로 다음 위치에 있는 블록의 헤더 정보를 업데이트 (종료 블록)
    PUT(HDRP(NEXT_BLKP(bp)), PACK(0, 1));
    
    // 인접한 자유 블록과 병합한 후 해당 포인터를 반환
    return coalesce(bp);
}


static void *coalesce(void *bp) {
    size_t prev_alloc = GET_ALLOC(FTRP(PREV_BLKP(bp)));  // 이전 블록의 할당 상태를 가져옴
    size_t next_alloc = GET_ALLOC(HDRP(NEXT_BLKP(bp)));  // 다음 블록의 할당 상태를 가져옴
    size_t size = GET_SIZE(HDRP(bp));                    // 현재 블록의 크기를 가져옴
    
    // 이전 블록과 다음 블록이 모두 할당된 경우
    if (prev_alloc && next_alloc) {
        
        // 현재 블록을 자유 리스트에 삽입
        insert_block(bp, size);
        
        // 병합이 필요 없으므로 현재 블록의 포인터를 반환
        return bp;
    }
    
    // 다음 블록이 할당되지 않은 경우
    else if (prev_alloc && !next_alloc) {
        
        // 해당 블록을 자유 리스트에서 제거
        remove_block(NEXT_BLKP(bp));
        
        // 현재 크기에 다음 블록의 크기를 추가하여 병합된 크기를 계산
        size += GET_SIZE(HDRP(NEXT_BLKP(bp)));
        
        // 헤더/푸터에 저장
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    // 이전 블록이 할당되지 않은 경우
    else if (!prev_alloc && next_alloc) {
        
        // 해당 블록을 자유 리스트에서 제거
        remove_block(PREV_BLKP(bp));
        
        // 현재 크기에 이전 블록의 크기를 추가하여 병합된 크기를 계산
        size += GET_SIZE(HDRP(PREV_BLKP(bp)));
        
        // 현재 블록의 푸터에 업데이트된 정보를 저장
        PUT(FTRP(bp), PACK(size , 0));
        // 이전 블록의 헤더에 업데이트된 정보를 저장
        PUT(HDRP(PREV_BLKP(bp)), PACK(size, 0));
        // 포인터 위치를 병합된 새로운 블록의 시작점으로 업데이트
        bp = PREV_BLKP(bp);
    }
    
    // 이전 블록과 다음 블록이 할당되지 않은 경우
    else if (!prev_alloc && !next_alloc) {
        
        // 해당 블록을 자유 리스트에서 제거
        remove_block(PREV_BLKP(bp));
        remove_block(NEXT_BLKP(bp));

        // 현재 크기에 이전 블록과 다음 블록의 크기를 추가하여 병합된 총 크기를 계산
        size += GET_SIZE(HDRP(PREV_BLKP(bp))) + GET_SIZE(FTRP(NEXT_BLKP(bp)));
        
        // 이전 블록의 헤더/다음 블록의 푸터에 업데이트된 정보를 저장
        PUT(HDRP(PREV_BLKP(bp)), PACK(size, 0));
        PUT(FTRP(NEXT_BLKP(bp)), PACK(size, 0));

        // 포인터 위치를 병합된 새로운 블록의 시작점으로 업데이트
        bp = PREV_BLKP(bp);
    }
    
    // 병합된 새로운 블록을 free list에 삽입
    insert_block(bp, size);

    // 병합된 블록의 포인터를 반환
    return bp;
}


static void place(void *bp, size_t asize) {
    
    // 현재 블록의 크기를 가져옴
    size_t csize = GET_SIZE(HDRP(bp));
    
    // bp가 가리키는 블록을 자유 리스트에서 제거
    remove_block(bp);

    // 요청된 크기(asize)와 현재 블록의 크기(csize)의 차이가 최소 블록 사이즈보다 클 경우
    if ((csize - asize) >= (2 * DSIZE)) {
        
        // 요청된 크기만큼의 공간에 헤더/푸터를 생성하고 할당 상태를 설정
        PUT(HDRP(bp), PACK(asize, 1));
        PUT(FTRP(bp), PACK(asize, 1));
        
        // 포인터 위치를 다음 블록으로 이동
        bp = NEXT_BLKP(bp);
        
        // 남은 공간에 대해 헤더/푸터를 생성하고 '미할당' 상태로 설정
        PUT(HDRP(bp), PACK(csize - asize, 0));
        PUT(FTRP(bp), PACK(csize - asize, 0));
        
        // 남은 공간을 병합 가능한 경우 병합 작업을 수행
        coalesce(bp);
    }
    
    // 요청된 크기와 현재 블록의 크기 차이가 최소 블록 사이즈보다 작거나 같은 경우
    else {

        // 전체 블록을 할당하여 사용
        // 헤더/푸터 '할당' 상태로 설정
        PUT(HDRP(bp), PACK(csize, 1));
        PUT(FTRP(bp), PACK(csize, 1));
    }
}


static void *find_fit(size_t asize) {
    
    void* bp;
    
    int list = 0;               // 리스트의 시작 인덱스를 설정
    size_t searchsize = asize;  // 검색할 크기를 설정
    
    // 전체 리스트를 순회하며 적절한 블록을 찾기
    while (list < LISTLIMIT) {
        
        // 현재 리스트가 마지막이거나, 검색 크기가 1 이하이고 해당 segregate list가 비어있지 않은 경우
        if ((list == LISTLIMIT - 1) || (searchsize <= 1) && (segregation_list[list] != NULL)) {
            
            // 현재 segregate list의 시작점을 가져옴
            bp = segregation_list[list];
            
            // 현재 블록이 NULL이 아니고 요청된 크기(asize)가 현재 블록의 크기보다 클 경우
            while ((bp != NULL) && (asize > GET_SIZE(HDRP(bp)))) {
                
                // 계속해서 다음 블록으로 넘어감
                bp = SUCC_FREE(bp);
            }
            
            // 적합한 블록을 찾았다면 그 위치를 반환
            if (bp != NULL) {
                return bp;
            }
        }
        
        // 검색할 크기를 절반으로 줄임
        searchsize >>= 1;
        
        // 다음 segregate list로 넘어감
        list++;
    }

    // 적합한 블록을 찾지 못했다면 NULL을 반환
    return NULL;
}


static void remove_block(void *bp) {
    
    // 리스트의 시작 인덱스를 설정
    int list = 0;
    
    // 현재 블록의 크기를 가져옴
    size_t size = GET_SIZE(HDRP(bp));
    
    // 적절한 segregate list를 찾기 위해 반복문을 수행
    while ((list < LISTLIMIT - 1) && (size > 1)) {
        
        size >>= 1;  // 현재 크기를 절반으로 줄임
        list++;      // 다음 segregate list로 넘어감
    }
    
    // bp의 다음 블록이 NULL이 아닌 경우
    if (SUCC_FREE(bp) != NULL) {
        
        // bp의 이전 블록이 NULL이 아닌 경우
        if (PRED_FREE(bp) != NULL) {
            // bp의 다음 블록과 이전 블록을 서로 연결
            PRED_FREE(SUCC_FREE(bp)) = PRED_FREE(bp);
            SUCC_FREE(PRED_FREE(bp)) = SUCC_FREE(bp);
        
        // bp의 이전 블록이 NULL인 경우
        } else {
            // bp와 그 다음 블록 사이에 연결된 것이 없다고 표시
            PRED_FREE(SUCC_FREE(bp)) = NULL;
            // 리스트 시작 위치를 업데이트
            segregation_list[list] = SUCC_FREE(bp);
        }

    // bp의 다음 블록이 없는 경우
    } else {
        
        // bp가 가리키는 이전 블록이 있으면
        if (PRED_FREE(bp) != NULL) {
            // bp가 가리키는 이전 블록과 연결된 것이 없다고 표시
            SUCC_FREE(PRED_FREE(bp)) = NULL;
        
        // bp가 가리키는 이전 블록이 없으면
        } else {
            // 해당 사이즈 범위에 free한 메모리가 없다고 표시
            segregation_list[list] = NULL;
        }
    }
    
    return;
}

static void insert_block(void *bp, size_t size) {
    
    int list = 0;
    
    void *search_ptr;
    void *insert_ptr = NULL;  // 초기 삽입 위치를 NULL로 설정

    // segregate list 중에서 적절한 리스트를 찾기 위해 반복문을 수행
    while ((list < LISTLIMIT - 1) && (size > 1)) {
        
        size >>= 1; // 현재 크기를 절반으로 줄임
        list++;     // 다음 segregate list로 이동
    }

    // 선택된 segregate list의 시작점을 search_ptr에 저장
    search_ptr = segregation_list[list];
    
    // 적절한 블록 위치를 찾기 위해 리스트를 순회
    while ((search_ptr != NULL) && (size > GET_SIZE(HDRP(search_ptr)))) {
        
        // 현재 검사 중인 블록의 위치를 insert 포인터에 저장
        insert_ptr = search_ptr;                                            
        // 다음 블록으로 이동
        search_ptr = SUCC_FREE(search_ptr);
    }

    /* 여기서부터는 새로운 블록(bp)을 자유 리스트에 추가하는 과정 */

    // 첫 번째 경우: 이미 있는 블록 사이에 새로운 블록을 추가하는 경우   
    if (search_ptr != NULL) {

        // 첫 번째 하위 경우: 이미 있는 블록 사이에 추가
        if (insert_ptr != NULL) {
            SUCC_FREE(bp) = search_ptr; // bp가 가리키는 다음 블록 설정
            PRED_FREE(bp) = insert_ptr; // bp가 가리키는 이전 블록 설정
            PRED_FREE(search_ptr) = bp; // 검색 포인터가 가리키는 이전 블록 업데이트
            SUCC_FREE(insert_ptr) = bp; // 삽입 포인터가 가리키는 다음 블록 업데이트
        
        // 첫 번째 하위 경우: 리스트의 시작 부분(맨 앞 부분)에 추가
        } else {
            SUCC_FREE(bp) = search_ptr;
            PRED_FREE(bp) = NULL;
            PRED_FREE(search_ptr) = bp;

            // 해당 segregated list의 시작점 업데이트
            // 현재 추가한 메모리 공간(블록), bp가 이제 시작점
            segregation_list[list] = bp;
        }

    // 검색 포인터가 null 인 경우, 즉 아직 아무런 블록도 없는 경우
    } else {
        if (insert_ptr != NULL) {
            SUCC_FREE(bp) = NULL;
            PRED_FREE(bp) = insert_ptr;
            SUCC_FREE(insert_ptr) = bp;
        } else {
            SUCC_FREE(bp) = NULL;
            PRED_FREE(bp) = NULL;
            
            // 해당 segregated list의 시작점 업데이트
            // 현재 추가한 메모리 공간(블록), bp가 이제 시작점
            segregation_list[list] = bp;
        }
    }
    
    return;
}