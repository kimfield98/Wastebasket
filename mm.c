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

// 매크로
#define WSIZE 4     // 워드 사이즈 (32bit 기준)
#define DSIZE 8     // 더블 워드 사이즈
#define CHUNKSIZE (1<<12)       // 힙을 확장하는 데 사용되는 메모리 블록의 크기를 결정하는 상수 (1을 왼쪽으로 12비트 시프트한 값, 십진수로 4096)

#define MAX(x,y) ((x) > (y)? (x) : (y))     // 주어진 두 개의 값을 비교하여 더 큰 값을 반환

// 메모리 조작 매크로
#define PACK(size, alloc) ((size) | (alloc))        // size와 alloc 비트를 합쳐서 하나의 워드로 만듦
#define GET(p) (*(unsigned int *)(p))       // p가 가리키는 위치에 저장된 값을 읽음
#define PUT(p, val) (*(unsigned int *)(p) = (val))      // p가 가리키는 위치에 val 값을 저장함

// 블록 정보 추출 매크로
#define GET_SIZE(p) (GET(p) & ~0x7)     // 헤더에서 블록 크기 추출. 마지막 3비트 제거 후 반환.
#define GET_ALLOC(p) (GET(p) & 0x1)     // 헤더에서 할당 비트 추출. 마지막 비트 반환.

// 포인터 계산 매크로
#define HDRP(bp) ((char *)(bp)-WSIZE)       // 데이터 영역의 시작부분에 대한 헤더 포인터 반환.
#define FTRP(bp)((char *)(bp)+GET_SIZE(HDRP(bp))-DSIZE)     // 데이터 영역의 마지막 부분에 대한 푸터 포인터 반환.
#define NEXT_BLKP(bp)((char *)(bp)+GET_SIZE(((char *)(bp)-WSIZE)))      // 다음 메모리 블록으로 이동한 포인터 반환.
#define PREV_BLKP(bp)((char *)(bp)-GET_SIZE(((char *)(bp)-DSIZE)))      // 이전 메모리 블록으로 이동한 포인터 반환.


static char *heap_listp;        // first_fit에서 사용하기 위한 정적 전역변수
static void *next_bp;       // next_fit에서 사용하기 위한 정적 전역변수
static void *find_fit(size_t asize);
static void *extend_heap(size_t words);
static void *coalesce(void *bp);
static void place(void *bp, size_t asize);
void* mm_realloc(void *ptr, size_t size);


// mm_init - 할당기 초기화
int mm_init(void)
{
    // 초기값으로 빈 Heap 생성
    if ((heap_listp = mem_sbrk(4*WSIZE)) == (void *)-1){
        return -1;
    }

    PUT(heap_listp, 0);     // Prologue 헤더 설정 (초기화)
    PUT(heap_listp + (1*WSIZE), PACK(DSIZE,1));     // Prologue 푸터 설정
    PUT(heap_listp + (2*WSIZE), PACK(DSIZE,1));     // Epilogue 헤더 설정
    PUT(heap_listp + (3*WSIZE), PACK(0,1));     // Epilogue 푸터 설정
    heap_listp += (2*WSIZE);    // heap_listp를 가용 블록 리스트의 첫 번째 위치로 업데이트

    if (extend_heap(CHUNKSIZE/WSIZE) == NULL)   // CHUNKSIZE 만큼의 초기 메모리 공간을 확보하고, 이를 가용 블록 리스트에 추가
        return -1;
    return 0;
}

// extend_heap - 가용 리스트(heap_listp가 가리키는 곳)에 새로운 가용 공간을 추가
static void *extend_heap(size_t words)
{
    char *bp;
    size_t size;

    // 요청된 워드 수를 기반으로 새로운 블록의 크기를 결정
    // 워드 수가 홀수인 경우 한 워드를 추가하여 더블 워드 정렬을 보장
    size = (words % 2) ? (words + 1) * WSIZE : words * WSIZE;

    // 시스템으로부터 메모리를 할당 받음. 실패하면 NULL을 반환.
    if ((long)(bp = mem_sbrk(size)) == -1)
        return NULL;

    // 새로 할당 받은 메모리 영역의 헤더와 푸터에 블록 크기와 할당 상태(여기서는 0)를 저장.
    PUT(HDRP(bp), PACK(size,0));
    PUT(FTRP(bp), PACK(size,0));
    // 다음 블록의 헤더에 에필로그 블록을 설정. 이는 마지막에 위치하며 크기가 0이고 할당 상태가 1.
    PUT(HDRP(NEXT_BLKP(bp)), PACK(0,1));

    // 현재 생성된 가용 블록과 인접한 가용 블록이 있는 경우 병합
    return coalesce(bp);
}

void mm_free(void *bp)
{
    // 현재 블록의 크기를 가져옴
    size_t size = GET_SIZE(HDRP(bp));

    // 현재 블록의 헤더와 푸터를 비할당 상태로 업데이트
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));

    // 현재 블록을 가용 리스트에 추가하고, 인접한 가용 블록이 있으면 병합함
    coalesce(bp);
}

// coalesce - bp가 가리키는 메모리 블록에 인접한 가용 메모리가 있다면 하나로 합치는 역할
static void *coalesce(void *bp)
{
    // 이전 블록과 다음 블록의 할당 상태를 확인
    size_t prev_alloc = GET_ALLOC(FTRP(PREV_BLKP(bp)));
    size_t next_alloc = GET_ALLOC(HDRP(NEXT_BLKP(bp)));
    
    // 현재 블록의 크기를 가져옴
    size_t size = GET_SIZE(HDRP(bp));

    // 이전 블록과 다음 블록 모두 할당된 상태라면 병합할 필요 없음
    if (prev_alloc && next_alloc) {
        next_bp = bp;  // next_bp에 bp위치를 저장
        return bp;
    }

    // 다음 블록만 비할당 상태라면, 현재 블록과 다음 블록 병합
    else if (prev_alloc && !next_alloc) {
        size += GET_SIZE(HDRP(NEXT_BLKP(bp)));
        PUT(HDRP(bp), PACK(size,0));
        PUT(FTRP(bp), PACK(size,0));
    }

    // 이전 블록만 비할당 상태라면, 현재 블록과 이전블록 병합
    else if (!prev_alloc && next_alloc) {
        size += GET_SIZE(HDRP(PREV_BLKP(bp)));
        PUT(FTRP(bp), PACK(size,0));
        PUT(HDRP(PREV_BLKP(bp)), PACK(size, 0));
        bp = PREV_BLKP(bp);
    }

    // 이전블록과 다음블록 모두 비할당 상태라면 세 개의 가용블록을 병합
    else {
        size += GET_SIZE(HDRP(PREV_BLKP(bp))) + GET_SIZE(FTRP(NEXT_BLKP(bp)));
        PUT(HDRP(PREV_BLKP(bp)), PACK(size,0));
        PUT(FTRP(NEXT_BLKP(bp)), PACK(size,0));
        bp = PREV_BLKP(bp);
    }

    next_bp = bp;  // next_bp에 bp위치를 저장
    return bp;  // 병합한 결과로 생성된 가용블럭의 포인터를 반환
}

// mm_malloc - 메모리 할당 요청(malloc)을 처리
void *mm_malloc(size_t size)
{
    size_t asize;   // 실제로 할당할 블록의 크기
    size_t extendsize;  // 필요한 경우 힙을 확장할 크기
    char *bp;

    // 요청된 크기가 0인 경우 NULL을 반환
    if (size == 0)
        return NULL;

    // 요청된 메모리 크기가 DSIZE 이하인 경우
    // 최소한의 오버헤드(헤더나 푸터)와 정렬을 위한 패딩을 고려해 (2*DSIZE)로 설정
    if (size <= DSIZE)
        asize = 2*DSIZE;
    // 요청된 메모리 크기가 DSIZE 초과인 경우
    else
        asize = DSIZE * ((size + (DSIZE) + (DSIZE-1)) / DSIZE); // 요청된 사이즈를 DSIZE 단위로 올림하는 연산

    // 가용 리스트에서 적합한 위치가 있으면 해당 블록에 할당하고 포인터를 반환
    if ((bp = find_fit(asize)) != NULL) {
        place(bp,asize);
        return bp;
    }

    // 적합한 위치를 찾지 못했다면, 힙을 확장
    extendsize = MAX(asize,CHUNKSIZE);
    if ((bp = extend_heap(extendsize/WSIZE)) == NULL)
        return NULL;
    place(bp,asize);
    return bp;
}

// find_fit - 메모리 할당을 위한 공간 탐색
static void *find_fit(size_t asize) {

    void *bp;
    
    // next_bp부터 힙의 끝까지 탐색
    for (bp=next_bp; GET_SIZE(HDRP(bp))>0; bp=NEXT_BLKP(bp)) {
        // 아직 할당되지 않은 충분한 크기의 블록이 있는 경우 해당 블록의 포인터를 반환
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp))))
            return bp;
    }
    
    // 만약 적합한 블록을 찾지 못했다면, 힙의 시작부터 next_bp까지 다시 탐색
    for (bp=heap_listp; bp!=next_bp; bp=NEXT_BLKP(bp)) {
        // 아직 할당되지 않은 충분한 크기의 블록이 있는 경우 해당 블록의 포인터를 반환
        if (!GET_ALLOC(HDRP(bp)) && (asize <= GET_SIZE(HDRP(bp))))
            return bp;
    }

    // 적합한 크기의 가용블럭을 찾지 못했으면 NULL 반환
    return NULL;
}

// place - 메모리 블록에 요청된 크기의 공간을 할당
static void place(void *bp, size_t asize)
{
    size_t csize = GET_SIZE(HDRP(bp));

    // 현재 블록(csize)에서 요청된 사이즈(asize)를 제외하였을 때 그 공간이 (2*DSIZE)보다 크거나 같다면
    if ((csize - asize) >= (2*DSIZE)) {
        PUT(HDRP(bp), PACK(asize,1));  // 해당 위치에 요청된 사이즈만큼 할당
        PUT(FTRP(bp), PACK(asize,1));
        bp = NEXT_BLKP(bp); 
        PUT(HDRP(bp), PACK((csize-asize), 0));  // 남은 공간에 대해 헤더와 푸터 업데이트
        PUT(FTRP(bp), PACK((csize-asize), 0));
    }else{  // 남는 공간이 최소블록보다 작으면 전체를 사용자가 요청한 사이즈로 처리
        PUT(HDRP(bp), PACK(csize,1));
        PUT(FTRP(bp), PACK(csize,1));
    }
}

// mm_realloc - 이미 할당된 메모리 블록의 크기를 변경
void *mm_realloc(void *ptr, size_t size)
{
    void *oldptr = ptr;  // 기존에 할당된 메모리 블록의 주소를 저장
    void *newptr;   // 새로 할당할 메모리 블록의 주소를 저장할 포인터
    size_t copySize;  // 실제로 복사될 데이터의 크기를 저장

    
    newptr = mm_malloc(size);  // 새로운 크기만큼 메모리를 할당받음

    if (newptr == NULL)  // 만약 메모리 할당이 실패하면 NULL을 반환
      return NULL;

    copySize = GET_SIZE(HDRP(oldptr));  // 기존에 할당된 블록의 크기를 가져옴
    
    if (size < copySize)  // 요청한 크기가 기존 블록의 크기보다 작다면, 요청한 크기만큼만 복사하도록 설정
      copySize = size;

    memcpy(newptr, oldptr, copySize);  // 기존 블록에서 새로운 블록으로 데이터를 복사
    mm_free(oldptr);  // 기존에 사용하던 메모리 해제
    return newptr;  // 새롭게 재할당된 메모리 블록 반환
}