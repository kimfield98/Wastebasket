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

#define PREC_FREEP(bp) (*(void**)(bp))         
#define SUCC_FREEP(bp) (*(void**)(bp + WSIZE))


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
void removeBlock(void *bp);
void putFreeBlock(void* bp);


int mm_init(void) {
    
    if ((heap_listp = mem_sbrk(6*WSIZE)) == (void*)-1) {
        return -1;
    }
    
    PUT(heap_listp, 0);                                                     // unused padding
    PUT(heap_listp + (1 * WSIZE), PACK(MINIMUM, 1));                        // prologue header
    PUT(heap_listp + (2 * WSIZE), (unsigned int)NULL);                                    // prec
    PUT(heap_listp + (3 * WSIZE), (unsigned int)NULL);                                    // succ
    PUT(heap_listp + (4 * WSIZE), PACK(MINIMUM, 1));                        // prologue footer
    PUT(heap_listp + (5 * WSIZE), PACK(0, 1));                              // epilogue header
    
    free_listp = heap_listp + 2 * WSIZE;

    if (extend_heap(CHUNKSIZE / WSIZE) == NULL) {
        return -1;
    }
    
    return 0;
}


static void* extend_heap(size_t words) {
    char* bp;
    size_t size;
    
    size = (words % 2 == 1) ? (words + 1) * WSIZE : (words) * WSIZE;
    
    if ((long)(bp = mem_sbrk(size)) == -1) {
        return NULL;
    }              
    
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));
    PUT(HDRP(NEXT_BLKP(bp)), PACK(0, 1));
    
    return coalesce(bp);
}


void mm_free(void *bp) {
    size_t size = GET_SIZE(HDRP(bp));
    
    PUT(HDRP(bp), PACK(size, 0));
    PUT(FTRP(bp), PACK(size, 0));                      
    
    coalesce(bp);
}


static void* coalesce(void* bp) {
    size_t prev_alloc = GET_ALLOC(FTRP(PREV_BLKP(bp)));
    size_t next_alloc = GET_ALLOC(HDRP(NEXT_BLKP(bp)));
    size_t size = GET_SIZE(HDRP(bp));
    
    if (prev_alloc && next_alloc) {
        putFreeBlock(bp);
        return bp;
    }
    
    else if (prev_alloc && !next_alloc) {
        removeBlock(NEXT_BLKP(bp));
        size += GET_SIZE(HDRP(NEXT_BLKP(bp)));
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    else if (!prev_alloc && next_alloc) {
        removeBlock(PREV_BLKP(bp));
        size += GET_SIZE(HDRP(PREV_BLKP(bp)));
        bp = PREV_BLKP(bp);
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    else {
        removeBlock(PREV_BLKP(bp));
        removeBlock(NEXT_BLKP(bp));
        size += GET_SIZE(HDRP(PREV_BLKP(bp))) + GET_SIZE(FTRP(NEXT_BLKP(bp)));
        bp = PREV_BLKP(bp);
        PUT(HDRP(bp), PACK(size, 0));
        PUT(FTRP(bp), PACK(size, 0));
    }
    
    putFreeBlock(bp);
    
    return bp;
}


void *mm_malloc(size_t size) {

    size_t asize;
    size_t extendsize;

    char *bp;
    
    if (size == 0) {
        return NULL;
    }
    
    asize = ALIGN(size + SIZE_T_SIZE);
    
    if ((bp = find_fit(asize)) != NULL) {
        place(bp, asize);
        return bp;
    }
    
    extendsize = MAX(asize, CHUNKSIZE);
    if ((bp = extend_heap(extendsize / WSIZE)) == NULL) {
        return NULL;
    }
    
    place(bp, asize);
    return bp;
}


static void* find_fit(size_t asize) {
    void* bp;
    
    for (bp = free_listp; GET_ALLOC(HDRP(bp)) != 1; bp = SUCC_FREEP(bp)) {
        if (asize <= GET_SIZE(HDRP(bp))) {
            return bp;
        }
    }
    
    return NULL;
}


static void place(void* bp, size_t asize) {

    size_t csize = GET_SIZE(HDRP(bp));

    removeBlock(bp);

    if ((csize - asize) >= (2 * DSIZE)) {

        PUT(HDRP(bp), PACK(asize, 1));
        PUT(FTRP(bp), PACK(asize, 1));
        
        bp = NEXT_BLKP(bp);
        PUT(HDRP(bp), PACK(csize - asize, 0));
        PUT(FTRP(bp), PACK(csize - asize, 0));
        
        putFreeBlock(bp);
        
    } else {
        PUT(HDRP(bp), PACK(csize, 1));
        PUT(FTRP(bp), PACK(csize, 1));
    }
}


void removeBlock(void *bp) {
    
    if (bp == free_listp) {
        PREC_FREEP(SUCC_FREEP(bp)) = NULL;
        free_listp = SUCC_FREEP(bp);
        
    } else {
        SUCC_FREEP(PREC_FREEP(bp)) = SUCC_FREEP(bp);
        PREC_FREEP(SUCC_FREEP(bp)) = PREC_FREEP(bp);
    }
}


void putFreeBlock(void* bp) {
    SUCC_FREEP(bp) = free_listp;
    PREC_FREEP(bp) = NULL;
    PREC_FREEP(free_listp) = bp;
    free_listp = bp;
}


void *mm_realloc(void *ptr, size_t size) {
    
    void *oldptr = ptr;
    void *newptr;
    size_t copySize;
    
    newptr = mm_malloc(size);

    if (newptr == NULL) {
        return NULL;
    }
    
    copySize = GET_SIZE(HDRP(oldptr));
    
    if (size < copySize) {
        copySize = size;
    }
    
    memcpy(newptr, oldptr, copySize);
    mm_free(oldptr);
    return newptr;
}