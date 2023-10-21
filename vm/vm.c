/* vm.c: Generic interface for virtual memory objects. */

#include "threads/malloc.h"
#include "vm/vm.h"
#include "include/threads/mmu.h"
#include "string.h"
#include "hash.h"
#include "userprog/process.h"

/*
4가지 상태 - uninit, anon, file, cache

초기화 안 된 상태는 uninit 상태이므로 초기화 필요 x
anon, file, cache 각각 초기화 함수를 호출하여 초기화시킴
*/
void
vm_init (void) {
    vm_anon_init ();
    vm_file_init ();
#ifdef EFILESYS  /* For project 4 */
    pagecache_init ();
#endif
    register_inspect_intr ();
    /* DO NOT MODIFY UPPER LINES. */
    /* TODO: Your code goes here. */
}

/* Get the type of the page. This function is useful if you want to know the
 * type of the page after it will be initialized.
 * This function is fully implemented now. */

/*이 페이지의 타입을 리턴해준다.(ex uninit, anon, file, cache)*/
enum vm_type
page_get_type (struct page *page) {
    int ty = VM_TYPE (page->operations->type);
    switch (ty) {
        case VM_UNINIT:
            return VM_TYPE (page->uninit.type);
        default:
            return ty;
    }
}

/* Helpers */
static struct frame *vm_get_victim (void);
static bool vm_do_claim_page (struct page *page);
static struct frame *vm_evict_frame (void);
static struct list f_occ_table;
static struct list f_free_table;

/*
대기중엔 페이지(uninit 상태)를 만들고 초기화 시킨다.
페이지를 생성할 땐, 이 함수나 vm_alloc_page 를 꼭 거쳐야 한다.

type: 할당하려는 가상 메모리 페이지의 유형을 지정. 
*upage: 할당하려는 가상 메모리 페이지의 시작 주소를 나타낸디.
writable: 페이지가 읽기/쓰기 가능한지를 나타낸다. 
*init: 페이지를 초기화하는 데 사용할 초기화 함수의 포인터를 나타냄.(lazy?)
*/
bool
vm_alloc_page_with_initializer (enum vm_type type, void *upage, bool writable,
        vm_initializer *init, void *aux) {

    ASSERT (VM_TYPE(type) != VM_UNINIT)

    upage = pg_round_down(upage); //page 에 맞게 크기 조정

    struct supplemental_page_table *spt = &thread_current ()->spt;
    /*upage 가 이미 할당된 상태인지 확인*/
    struct page * found_page = spt_find_page (spt, upage);
    if (found_page == NULL) {
        /* TODO: Create the page, fetch the initialier according to the VM type,
        //페이지 생성, 타입에 맞는 초기화 함수 호출

         * TODO: and then create "uninit" page struct by calling uninit_new. You
         * TODO: should modify the field after calling the uninit_new. */
        //uninit_new 를 호출하여 uninit 페이지 구조체 만들기.
        //uninit_new를 호출한 다음 필드를 수정해야함.

        /* TODO: Insert the page into the spt. */
        //페이지를 spt에 삽입
        struct page *pd_upage = calloc(1,sizeof(struct page)); // 커널 풀에 4kb 공간 할당 받고 0으로 초기화 
        //(유저 풀에 하면 사용자가 페이지 정보를 볼 수 있으므로. -> protection)

        // void* pd_upage = pg_round_down(upage);  // offset을 페이지의 시작 위치로 만들기 위해
        pd_upage->writable = writable;
        pd_upage->va = upage;

        switch (VM_TYPE(type)) {
            case VM_ANON:
                // 인자로 받은 타입으로 초기화를 해줌 (이같은 경우는 anon_initializer를 인자로 받아 anon으로 초기화)
                uninit_new(pd_upage, upage, init, type, aux, anon_initializer); 
                pd_upage->writable = writable; // aux에 있는 걸로도 넘길 수 있을까?
                break;
            case VM_FILE:
                uninit_new(pd_upage, upage, init, type, aux, file_backed_initializer);
                pd_upage->writable = writable;
                break;
            default:
                break;
        }
        if(!spt_insert_page(spt,pd_upage))
            return false;
        else return true;
    }
    else{
        return false;
    }
}

/* spt에서 va를 찾아 그 페이지를 리턴함. 에러시 리턴 NULL*/
struct page *
spt_find_page (struct supplemental_page_table *spt UNUSED, void *va UNUSED){
    struct page page;
    /* TODO: Fill this function. */
      struct hash_elem *e;

    void* pd_upage = pg_round_down(va); //page 에 맞게 크기 조정

    page.va = pd_upage;

    e = hash_find (&spt->hash_table, &page.h_elem);
    return e != NULL ? hash_entry (e, struct page, h_elem) : NULL;
}

/* 페이지를 검증한 다음 spt 테이블에 삽입. */
bool
spt_insert_page (struct supplemental_page_table *spt,
    struct page *page) {
    int succ = false;
    /* TODO: Fill this function. */
    if (hash_insert(&spt->hash_table, &page->h_elem)==NULL);
        succ = true;
    return succ;
}

/*spt에서 페이지 제거*/
void
spt_remove_page (struct supplemental_page_table *spt, struct page *page) {
    hash_delete(&spt->hash_table, &page->h_elem);
    vm_dealloc_page (page);
    return true;
}

/* Get the struct frame, that will be evicted. */
/*쫒아낼 frame을 찾아 리턴함*/
static struct frame *
vm_get_victim (void) {
    struct frame *victim = NULL;
     /* TODO: The policy for eviction is up to you. */
    
    return victim;
}

/*정책에 따라 페이지를 쫒아내고 그 페이지에 상응하는 프레임을 리턴함. 에러 시 NULL 리턴*/
static struct frame *
vm_evict_frame (void) {
    struct frame *victim = vm_get_victim ();
    /* TODO: swap out the victim and return the evicted frame. */

    return NULL;
}

/*

"palloc()을 호출하고 프레임을 얻습니다. 
사용 가능한 페이지가 없는 경우 페이지를 제거하고 반환합니다. 
이 함수는 항상 유효한 주소를 반환합니다. 
즉, 사용자 풀 메모리가 가득 찬 경우, 이 함수는 사용 가능한 메모리 공간을 얻기 위해 프레임을 제거합니다."
*/


static struct frame *
vm_get_frame (void) {
    struct frame *frame = calloc(1,sizeof(struct page));
    struct thread* curr = thread_current();
    // /* TODO: Fill this function. */

    // 인자로 아무것도 안 넣었을 때 커널풀, PAL_USER 는 유저풀 , PAL_ZERO 는 0으로 초기화 해줌.
	if(list_empty(&f_free_table)){
        frame->kva = palloc_get_page(PAL_USER|PAL_ZERO);
        //palloc()을 호출하여 프레임을 얻는다. 이 때, PAL_ZREO 를 인자로 넘겨서 커널 풀 영역에 페이지를 할당한다.
    }
    else{
		frame = list_entry(list_pop_front(&f_free_table), struct frame, f_elem);
		//이 프레임으로 kva 다시 뺀다.
	}
    if (frame->kva == NULL){ //사용 가능한 페이지가 없는 경우
        struct frame *reframe = vm_evict_frame(); //페이지를 쫒아내고 그 페이지에 상응하는 프레임을 reframe으로 리턴.
        swap_out(reframe->page); // reframe을 물리 메모리에서 스왚 디스크로 swap_out
		free_in_occ_out(&reframe->f_elem);
        reframe->page = NULL; // 프레임의 page NULL로.
        pml4_clear_page (curr->pml4,reframe->kva); //pml4 맵핑을 끊어야함 => pa와의 맵핑을 끊음.
        return reframe; // 맵핑을 끊은, 이제 빈 프레임 반환
    }
    frame->page = NULL; // 프레임의 page NULL로.
    list_push_back(&f_occ_table, &frame->f_elem); // 프레임 테이블에 방금 만든 프레임 집어넣음

    ASSERT (frame != NULL);
    ASSERT (frame->page == NULL);
    return frame;
}

/* Growing the stack. */
static void
vm_stack_growth (void *addr UNUSED) {
    vm_alloc_page(VM_ANON|VM_MARKER_0,pg_round_down(addr),1);
}

/* 쓰기 보호된 페이지의 오류를 처리합니다. */
static bool
vm_handle_wp (struct page *page UNUSED) {
	// swap_out();
	list_remove(&page->frame->f_elem); // swap_out 했으므로 frame table 에서 빼줌.
	// swap_in();
    return true; // 성공하면
}

/* Return true on success */
bool
vm_try_handle_fault (struct intr_frame *f UNUSED, void *addr UNUSED,
        bool user UNUSED, bool write UNUSED, bool not_present UNUSED) {
            
    struct supplemental_page_table *spt = &thread_current ()->spt;
    struct page *page = NULL;
    /* TODO: Validate the fault */ // segmentation fault 인지 page fault 인지 검증?
    if(!addr){
        return false;
    }
    if (!is_user_vaddr(addr)){
        return false;
    }
    if(not_present) // frame 자체가 비어있는 경우
    {//page fault 로직 처리
        void* rsp = f->rsp;
        if(!user)
            rsp = thread_current()->rsp;
        if (USER_STACK - (1 << 20) <= rsp && rsp <= addr && addr <= USER_STACK){
            vm_stack_growth(addr);
        }
        page = spt_find_page(spt,addr);
        if (!page)
            return false;
        return vm_do_claim_page (page); // 프레임 할당하는 함수
    }
    else{ // frame은 채워져 있는 상태(이지만 내 것인지 모를 때?)
        if(write) // 타입이 file
            return vm_handle_wp(page);
        else{ // 타입이 anon
            return true;
			// addr로 page를 찾아서 0을 채워준다.
			
        } 
    }
}

/* Free the page.
 * DO NOT MODIFY THIS FUNCTION. */
void
vm_dealloc_page (struct page *page) {
    destroy (page);
    free (page);
}

/*위 함수는 인자로 주어진 va에 페이지를 할당하고, 
그 이후에 해당 페이지를 인자로 갖는 vm_do_claim_page라는 함수를 호출하여
해당 페이지에 프레임을 할당합니다. */
bool
vm_claim_page (void *va UNUSED) {
    struct thread* curr = thread_current();
    va = pg_round_down(va);
    struct page *page = spt_find_page(&curr->spt, va);
    /* TODO: Fill this function */
    if(!page){
        return false;
        // vm_alloc_page(VM_ANON,va,true);
        // page = spt_find_page(&curr->spt, va); 
        // page fault 가 일어나기 전에는 vm_alloc으로 할당해 줘야 하지만
        // handler 가 호출 할 때는 do claim page에서는 spt_find 를 했는데도 없으면 만들면 안된다.
    }

    return vm_do_claim_page (page);
}

/* 인자로 주어진 page에 물리 메모리 프레임을 할당합니다.*/
static bool
vm_do_claim_page (struct page *page) {
    struct frame *frame = vm_get_frame ();
    struct thread *curr = thread_current();

    /* Set links */
    frame->page = page;
    page->frame = frame;
    

    /* TODO: 페이지 테이블 항목을 삽입하여 페이지의 가상 주소(VA)를 프레임의 물리 주소(PA)에 매핑합니다. */
    list_push_back(&f_occ_table,&frame->f_elem); // 프레임 테이블에 삽입 한 후 
    pml4_set_page(curr->pml4,page->va,frame->kva,true); // page 와 물리 메모리 맵핑

    return swap_in (page, frame->kva);
}

/* Initialize new supplemental page table */
void
supplemental_page_table_and_f_occ_table_init (struct supplemental_page_table *spt) {
    struct hash h_table;
    spt->hash_table = h_table;
    hash_init(&spt->hash_table,page_hash,page_less,NULL);
    list_init(&f_occ_table);
	list_init(&f_free_table);
}


bool
supplemental_page_table_copy (struct supplemental_page_table *dst UNUSED,
        struct supplemental_page_table *src UNUSED) {
    struct hash_iterator i;
    hash_first (&i, &src->hash_table);
    while (hash_next (&i)) {
		// src_page 정보
		struct page *src_page = hash_entry(hash_cur(&i), struct page, h_elem);
		enum vm_type type = src_page->operations->type;
		void *upage = src_page->va;
		bool writable = src_page->writable;

		/* 1) type이 uninit이면 */
		if (type == VM_UNINIT)
		{ // uninit page 생성 & 초기화
			vm_initializer *init = src_page->uninit.init;
			void *aux = src_page->uninit.aux;
			vm_alloc_page_with_initializer(VM_ANON, upage, writable, init, aux);
			continue;
		}

		/* 2) type이 file이면 */
		if (type == VM_FILE)
		{
			struct lazy_aux *file_aux = malloc(sizeof(struct lazy_aux));
			file_aux->file = src_page->file.file;
			file_aux->ofs = src_page->file.ofs;
			file_aux->read_bytes = src_page->file.read_bytes;
			file_aux->zero_bytes = src_page->file.zero_bytes;
			if (!vm_alloc_page_with_initializer(type, upage, writable, NULL, file_aux))
				return false;
			struct page *file_page = spt_find_page(dst, upage);
			file_backed_initializer(file_page, type, NULL);
			file_page->frame = src_page->frame;
			pml4_set_page(thread_current()->pml4, file_page->va, src_page->frame->kva, src_page->writable);
			continue;
		}

		/* 3) type이 anon이면 */
		if (!vm_alloc_page(type, upage, writable)) // uninit page 생성 & 초기화
			return false;						   // init이랑 aux는 Lazy Loading에 필요. 지금 만드는 페이지는 기다리지 않고 바로 내용을 넣어줄 것이므로 필요 없음

		// vm_claim_page으로 요청해서 매핑 & 페이지 타입에 맞게 초기화
		if (!vm_claim_page(upage))
			return false;

		// 매핑된 프레임에 내용 로딩
		struct page *dst_page = spt_find_page(dst, upage);
		memcpy(dst_page->frame->kva, src_page->frame->kva, PGSIZE);
	}
	return true;
}

void hash_page_destroy(struct hash_elem *e, void *aux)
{
    struct page *page = hash_entry(e, struct page, h_elem);
    destroy(page);
    free(page);
}

/*보조 페이지 테이블에서 보유한 리소스를 해제합니다.*/
void
supplemental_page_table_kill (struct supplemental_page_table *spt UNUSED) {
    /* TODO: 스레드가 보유한 모든 보조 페이지 테이블을 파괴하고
     수정된 모든 내용을 저장 매체에 기록합니다."*/
    hash_clear(&spt->hash_table,hash_page_destroy);
}

/* Returns a hash value for page p. */
unsigned
page_hash (const struct hash_elem *p_, void *aux UNUSED) {
  const struct page *p = hash_entry (p_, struct page, h_elem);
  return hash_bytes (&p->va,sizeof(p->va));
}

/* Returns true if page a precedes page b. */
bool
page_less (const struct hash_elem *a_,
           const struct hash_elem *b_, void *aux UNUSED) {
  const struct page *a = hash_entry (a_, struct page, h_elem);
  const struct page *b = hash_entry (b_, struct page, h_elem);

  return (uint64_t)a->va < (uint64_t)b->va;
}

void free_in_occ_out(struct frame *frame){
		list_remove(&frame->f_elem);
		list_push_back(&f_free_table,&frame->f_elem);
}

void occ_in_free_out(struct frame *frame){
		list_remove(&frame->f_elem); 
		list_push_back(&f_occ_table,&frame->f_elem);
}