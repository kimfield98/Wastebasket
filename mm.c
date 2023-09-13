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
#define MINIMUM 16
#define CHUNKSIZE (1<<12)

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

#define PREC_FREEP(bp) (*(void**)(bp))          // 이전 free block의 주소를 가져옴
#define SUCC_FREEP(bp) (*(void**)(bp + WSIZE))  // 다음 free block의 주소를 가져옴

static char* heap_listp;
static char* free_listp;

static void* extend_heap(size_t words);
static void* coalesce(void* bp);
static void* find_fit(size_t asize);
static void place(void* bp, size_t newsize);

int mm_init(void);
void *mm_malloc(size_t size);
void mm_free(void *bp);
void *mm_realloc(void *ptr, size_t size);
void removeBlock(void *bp);     // free list에서 블록을 제거
void putFreeBlock(void* bp);    // free list에 블록을 추가


int mm_init(void) {
    
    // 메모리 할당이 실패하면 -1 반환
    if ((heap_listp = mem_sbrk(6*WSIZE)) == (void*)-1) {
        return -1;
    }
    
    PUT(heap_listp, 0);                                  // unused padding
    PUT(heap_listp + (1 * WSIZE), PACK(MINIMUM, 1));     // prologue header
    PUT(heap_listp + (2 * WSIZE), (unsigned int)NULL);   // predecessor
    PUT(heap_listp + (3 * WSIZE), (unsigned int)NULL);   // successor
    PUT(heap_listp + (4 * WSIZE), PACK(MINIMUM, 1));     // prologue footer
    PUT(heap_listp + (5 * WSIZE), PACK(0, 1));           // epilogue header
    
    free_listp = heap_listp + 2 * WSIZE;  // free list의 첫 번째 요소를 가리키는 포인터 초기화

    // 초기 힙 확장이 실패하면 -1 반환
    if (extend_heap(CHUNKSIZE / WSIZE) == NULL) {
        return -1;
    }
    
    // 초기화가 성공적으로 완료되면 0 반환
    return 0;
}


static void* extend_heap(size_t words) {
    
    char* bp;
    size_t size;
    
    // 요청된 크기를 워드(word) 단위에서 바이트(byte) 단위로 변환
    // 만약 요청된 크기가 홀수라면, 8바이트 정렬을 위해 1을 더함
    size = (words % 2 == 1) ? (words + 1) * WSIZE : (words) * WSIZE;
    
    // mem_sbrk 함수를 사용하여 힙을 요청된 크기만큼 확장
    // 만약 메모리 할당에 실패하면 NULL을 반환
    if ((long)(bp = mem_sbrk(size)) == -1) {
        return NULL;
    }              
    
    // 새로운 비할당 블록의 헤더와 푸터를 설정
    // 그 다음 위치의 블록에 에필로그 헤더를 추가
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));
    PUT(HDRP(NEXT_BLKP(bp)), PACK(0, 1));
    
    // 이웃하는 비할당 블록과 병합 가능한 경우 병합하고 결과를 반환
    return coalesce(bp);
}


void mm_free(void *bp) {

    // 해제하려는 블록의 크기를 가져옴
    size_t size = GET_SIZE(HDRP(bp));
    
    // 해당 블록의 헤더/푸터를 업데이트하여 할당 상태를 '비할당'으로 변경
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));                      
    
    // 이웃하는 비할당 블록과 병합 가능한 경우 병합
    coalesce(bp);
}


static void* coalesce(void* bp) {
    size_t prev_alloc = GET_ALLOC(FTRP(PREV_BLKP(bp)));  // 이전 블록의 할당 상태를 확인
    size_t next_alloc = GET_ALLOC(HDRP(NEXT_BLKP(bp)));  // 다음 블록의 할당 상태를 확인
    size_t size = GET_SIZE(HDRP(bp));  // 현재 블록의 크기를 가져옴
    
    // 이전 블록과 다음 블록 모두 할당된 경우
    // 현재 블록을 free list에 추가하고 반환
    if (prev_alloc && next_alloc) {
        putFreeBlock(bp);
        return bp;
    }
    
    // 이전 블록은 할당되었지만, 다음 블록은 비할당된 경우
    else if (prev_alloc && !next_alloc) {
        
        removeBlock(NEXT_BLKP(bp));             // 다음 비할당된 블럭을 free list에서 제거
        size += GET_SIZE(HDRP(NEXT_BLKP(bp)));  // 그 크기를 현재 크기에 추가하여 병합

        PUT(HDRP(bp), PACK(size, 0));           // 헤더와 푸터 업데이트
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    // 이전 블럭이 비할당되었지만, 다음은 할당된 경우
    else if (!prev_alloc && next_alloc) {

        removeBlock(PREV_BLKP(bp));             // 이전 비할당된 부분을 free list에서 제거
        size += GET_SIZE(HDRP(PREV_BLKP(bp)));  // 그 크기를 현재 크기에 추가하여 병합
        bp = PREV_BLKP(bp);
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    // 이전과 다음 모두 비할당된 경우(양쪽으로 병합 가능)
    else {
        removeBlock(PREV_BLKP(bp));
        removeBlock(NEXT_BLKP(bp));

        // 이전과 다음 블록의 크기를 모두 현재 크기에 추가하여 병합
        size += GET_SIZE(HDRP(PREV_BLKP(bp))) + GET_SIZE(FTRP(NEXT_BLKP(bp)));
        // 병합된 새로운 블록의 시작 주소를 설정
        bp = PREV_BLKP(bp);
        
        PUT(HDRP(bp), PACK(size, 0));   // 헤더와 푸터 업데이트
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    // 병합된 블록을 free list에 추가
    putFreeBlock(bp);
    
    // 병합된 블록의 주소를 반환
    return bp;
}


void *mm_malloc(size_t size) {

    size_t asize;       // 할당할 크기
    size_t extendsize;  // 힙 확장 크기

    char *bp;
    
    // 요청된 크기가 0인 경우 NULL을 반환
    if (size == 0) {
        return NULL;
    }
    
    // 요청된 크기에 헤더/푸터의 크기를 더하고, 이를 정렬
    asize = ALIGN(size + SIZE_T_SIZE);
    
    // 적절한 위치를 찾아서 할당 시도
    if ((bp = find_fit(asize)) != NULL) {
        
        // 찾은 위치에 메모리 할당
        place(bp, asize);
        return bp;
    }
    
    // 필요한 경우 힙을 확장하고 다시 할당 시도
    extendsize = MAX(asize, CHUNKSIZE);
    if ((bp = extend_heap(extendsize / WSIZE)) == NULL) {
        return NULL;
    }
    
    // 찾은 위치에 메모리를 할당하고 그 주소를 반환
    place(bp, asize);
    return bp;
}


static void* find_fit(size_t asize) {
    void* bp;
    
    // free list를 순회하면서 첫 번째로 충분히 큰 비할당 블록을 찾기
    for (bp = free_listp; GET_ALLOC(HDRP(bp)) != 1; bp = SUCC_FREEP(bp)) {
        
        if (asize <= GET_SIZE(HDRP(bp))) {  // 요청된 크기가 현재 블록의 크기보다 작거나 같은 경우
            
            return bp;                      // 해당 블록의 포인터를 반환
        }
    }
    
    // 적절한 크기의 비할당 블록을 찾지 못한 경우 NULL을 반환
    return NULL;
}


static void place(void* bp, size_t asize) {

    // 현재 블록의 크기를 가져옴
    size_t csize = GET_SIZE(HDRP(bp));

    // 비할당 블록 리스트에서 현재 블록을 제거
    removeBlock(bp);

    // 만약 할당 후 남은 공간이 최소 블록 크기(헤더 + 푸터) 이상이라면
    if ((csize - asize) >= (2 * DSIZE)) {

        // 현재 위치에 요청된 크기만큼 할당
        PUT(HDRP(bp), PACK(asize, 1));
        PUT(FTRP(bp), PACK(asize, 1));
        
        // 다음 블록으로 이동
        bp = NEXT_BLKP(bp);

        // 남은 공간을 비할당 상태로 설정
        PUT(HDRP(bp), PACK(csize - asize, 0));
        PUT(FTRP(bp), PACK(csize - asize, 0));
        
        // 비할당 블록 리스트에 추가
        putFreeBlock(bp);

    // 남은 공간이 최소 블록 크기보다 작다면 (분할 후에도 사용 가능한 메모리x)
    } else {

        // 전체 블럭을 할당 상태로 설정
        PUT(HDRP(bp), PACK(csize, 1));
        PUT(FTRP(bp), PACK(csize, 1));
    }
}


void removeBlock(void *bp) {
    
    // 제거하려는 블록이 리스트의 첫 번째 블록인 경우
    if (bp == free_listp) {
        PREC_FREEP(SUCC_FREEP(bp)) = NULL;      // 다음 블록의 이전 포인터를 NULL로 설정
        free_listp = SUCC_FREEP(bp);            // free_listp를 다음 블록으로 이동

    // 제거하려는 블록이 중간에 위치한 경우    
    } else {
        SUCC_FREEP(PREC_FREEP(bp)) = SUCC_FREEP(bp);  // 이전 블록의 다음 포인터를 현재 블록의 다음 포인터로 변경
        PREC_FREEP(SUCC_FREEP(bp)) = PREC_FREEP(bp);  // 다음 블록의 이전 포인터를 현재 블록의 이전 포인터로 변경
    }
}


void putFreeBlock(void* bp) {

    SUCC_FREEP(bp) = free_listp;    // 새 블록의 '다음'은 기존 첫 번째 블록
    PREC_FREEP(bp) = NULL;          // 새 블록의 '이전'은 NULL
    PREC_FREEP(free_listp) = bp;    // 기존 첫 번째 블록의 '이전'은 새 블록

    free_listp = bp;                // 리스트의 시작점을 새 블록으로 업데이트
}


void *mm_realloc(void *ptr, size_t size) {
    
    void *oldptr = ptr;         // 기존 메모리 블록의 포인터를 저장
    void *newptr;               // 새로 할당할 메모리 블록의 포인터를 선언
    size_t copySize;            // 복사할 데이터의 크기를 저장할 변수를 선언
    
    newptr = mm_malloc(size);   // 새로운 크기만큼 메모리 블록을 할당받음

    // 만약 메모리 할당에 실패했다면 NULL을 반환
    if (newptr == NULL) {
        return NULL;
    }
    
    // 기존 메모리 블록의 크기를 가져옴
    copySize = GET_SIZE(HDRP(oldptr));
    
    // 요청한 크기가 기존 블록의 크기보다 작다면
    // 복사할 데이터의 크기를 요청한 크기로 변경
    if (size < copySize) {
        copySize = size;
    }
    
    // 기존 블록에서 새로운 블록으로 데이터를 복사
    memcpy(newptr, oldptr, copySize);
    
    // 기존 메모리 블록을 해제
    mm_free(oldptr);
    
    // 새로 할당된 메모리 블록의 포인터를 반환
    return newptr;
}