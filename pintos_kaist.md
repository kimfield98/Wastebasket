## 2차 시도

### `vm.c`

```c
/* Return true on success */
bool
vm_try_handle_fault (struct intr_frame *f UNUSED, void *addr UNUSED,
		bool user UNUSED, bool write UNUSED, bool not_present UNUSED) {
	struct supplemental_page_table *spt UNUSED = &thread_current ()->spt;
	struct page *page = NULL;
	/* TODO: Validate the fault */
	/* TODO: Your code goes here */

	return vm_do_claim_page (page);
}
```

`vm_try_handle_fault()`

1. bool user 확인 후 유저일 때 return false이고 커널일 때 true 다음 실행
2. bool not_present 확인 후 비어있으면 return vm_do_claim_page이고 채워져있으면 다음 실행
3. bool write 확인 후 true이면 return true이고, false이면(=segmentation fault이므로) swap어쩌구시작하는데진짜많아함수로빼야해

그래서 어쩌고 저쩌고 설명해볼게

swap in & out에 관한 거야 왜냐면 해당 프레임에 유저 프로세스가 원하는 가상주소가  올라가있지 않으므로 찾아야 해

1. swap out 해야 하는 frame num 0일 때
    1. disk의 swap영역에 진짜 frame0 데이터를 저장해준다.
    2. (page와 연결된)frame0을 st1에 넣어준다.
    3. ft안에 frame0의 status를 free로 만들어준다.
2. disk안에 st 확인 → 인자로 들어온 va를 타고 page num를 얻고 이를 통해 frame num를 확인해서 swap num을 찾음
    1. swap num에 있는 frame num가 하나라면
        1. 바로 물리 메모리에 올려준다
    2. swap num에 있는 frame num가 여러 개라면
        1. page table을 확인해서 frame num에 연결된 page num를 확인하고 일치하면
        2. 물리 메모리에 올려준다
3. swap table에서 해당 frame num을 삭제 (비트맵으로 0이 될지 혹은 frame table 처럼 free ????)
4. 해당 frame의 status를 ft에서 free→occ로 만들어준다.

- 데이터 교환 시 lock 처리