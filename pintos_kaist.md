## 1차 시도

### `process.c`

프로그램이 새로 시작되는 `**process_create_initd**(const char *file_name)`

`**thread_create**()` 의 함수 인자인 → `**initd**(void *f_name)` 실행

(`process_init()` → `**process_exec**(f_name)` 호출)

- `**process_exec**(void *f_name)`
    
    f_name을 새로 생성된 process or thread 내에서 실행하기 위한 함수.
    f_name은 전체command line, parsing 필요
    함수 실행 실패 시 -1을 반환.
    ("Switch the current execution context to the f_name") */
    

<aside>
👀 init() 완성하기!

</aside>

```c
// initd()

#ifdef VM
    supplemental_page_table_init(&thread_current()->spt);
#endif
```

미리 확인해야 할 것

thread 구조체 안에 spt가 있는가? → 기본적으로 있다!

### 1번 과제 _ `supplemental_page_table_init` 구현하기!

```c
/* Initialize new supplemental page table */
void
supplemental_page_table_init (struct supplemental_page_table *spt UNUSED) {
}
```

1. `hash_init()` 를 추가하고 싶은데 그러려면 `include hash.h`를 해줘야 함
    1. spt가 hash table 이니까 그렇다면 hash init까지 해줘야하지 않을까란 추측으로 코드를 넣음
2. 인자로 들어오는 `supplemental_page_table` ←에 hash 구조체가 없다! 그래서 추가했다.
3. 다시 돌아와서 `hash_init()`에 인자를 무엇을 넣어줘야 하는가?
    1. spt→hash table, ? (docs에 나와있음)
4. ?에 들어갈 page_hash()와 page_less()
    1. 그 전에! page 구조체에 h_elem이 있는가? 추가하자
5. page_hash를 먼저 만들자 (return 값은 hash_int(&hash_pg→va))
    1. hash_elem을 가져와서 page를 찾는 작업
6. page_less를 이어서 만들자!
    1. 가상주소에 잇는 page와 hash_table에 있는 가상주소를 비교하며 매핑 확인하는 작업
    2. 왜 부등호인가? list 순회하며 자신의 위치를 찾았던 것처럼 같은 작업!
7. 다 만들었으면 ?에 인자로 각 함수를 추가해주고, 선언도 해주자!

---

```c
// initd()

#ifdef VM
    supplemental_page_table_init(&thread_current()->spt);
#endif

process_init(); // 여기는 별 거 없다

    if (process_exec(f_name) < 0) // process_exec으로 가보자!
        PANIC("Fail to launch initd\n");
    NOT_REACHED();
```

`process_exec` 안에 `load()` → `load_segment()` 를 타고 들어가면 2개가 있는데 다른 공간 말고 VM 공간으로 찾아가자!

```c
static bool load_segment(struct file *file, off_t ofs, uint8_t *upage, uint32_t read_bytes, uint32_t zero_bytes, bool writable) {
    ASSERT((read_bytes + zero_bytes) % PGSIZE == 0);
    ASSERT(pg_ofs(upage) == 0);
    ASSERT(ofs % PGSIZE == 0);

    while (read_bytes > 0 || zero_bytes > 0) {
        /* Do calculate how to fill this page.
         * We will read PAGE_READ_BYTES bytes from FILE
         * and zero the final PAGE_ZERO_BYTES bytes. */
        size_t page_read_bytes = read_bytes < PGSIZE ? read_bytes : PGSIZE;
        size_t page_zero_bytes = PGSIZE - page_read_bytes;

        /* TODO: Set up aux to pass information to the lazy_load_segment. */
        void *aux = NULL;
        if (!vm_alloc_page_with_initializer(VM_ANON, upage, writable, lazy_load_segment, aux))
            return false;
*****************************************************바로 위의 저거야 !! lazy 함수 채우기

        /* Advance. */
        read_bytes -= page_read_bytes;
        zero_bytes -= page_zero_bytes;
        upage += PGSIZE;
    }
    return true;
}
```

해야 할 것

1. `lazy_load_segment`
2.  /* TODO: Set up aux to pass information to the lazy_load_segment. */ `vm_alloc_page_with_initializer`
    1. 가지가 갈라지는데 `spt_find_page` 는 나중에 고려*
3. 다 하면 `load_segment` 가 실행이 문제 없이 된다. → `load()`가 문제 없이 실행 된다는 뜻

---

이제 순서대로 해볼게

<aside>
👀 잠깐! load()의 역할과 그 안에서 load_segment()를 실행함으로써 thread안의 ELF는 어떻게 변화하는가?→ 정리해서 공유하기

</aside>