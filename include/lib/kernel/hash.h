#ifndef __LIB_KERNEL_HASH_H
#define __LIB_KERNEL_HASH_H

/* Hash table.
 *
 * This data structure is thoroughly documented in the Tour of
 * Pintos for Project 3.
 *
 * This is a standard hash table with chaining.  To locate an
 * element in the table, we compute a hash function over the
 * element's data and use that as an index into an array of
 * doubly linked lists, then linearly search the list.
 *
 * The chain lists do not use dynamic allocation.  Instead, each
 * structure that can potentially be in a hash must embed a
 * struct hash_elem member.  All of the hash functions operate on
 * these `struct hash_elem's.  The hash_entry macro allows
 * conversion from a struct hash_elem back to a structure object
 * that contains it.  This is the same technique used in the
 * linked list implementation.  Refer to lib/kernel/list.h for a
 * detailed explanation. */

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include "list.h"

/* Hash element. */
struct hash_elem {
	struct list_elem list_elem;
};

/* Converts pointer to hash element HASH_ELEM into a pointer to
 * the structure that HASH_ELEM is embedded inside.  Supply the
 * name of the outer structure STRUCT and the member name MEMBER
 * of the hash element.  See the big comment at the top of the
 * file for an example. */
/*hash_elem 구조체의 포인터인 elem 구조체를 포함한 구조체의 포인터를 반환하는 함수*/
#define hash_entry(HASH_ELEM, STRUCT, MEMBER)                   \
	((STRUCT *) ((uint8_t *) &(HASH_ELEM)->list_elem        \
		- offsetof (STRUCT, MEMBER.list_elem)))

/* Computes and returns the hash value for hash element E, given
 * auxiliary data AUX. */
typedef uint64_t hash_hash_func (const struct hash_elem *e, void *aux);
/*
hash_hash_func은 어떻게 들어올 지 모르는 각 hash_elem에 값에 대비한 함수이다. 
hash_elem이 다양한 자료형으로 들어올 수 있으니, 해당 자료형에 맞춰 hash_bytes, hash_string, hash_int를 알맞게 사용하면 된다. 
이 각각의 함수가 hash_funtion이다. (hash.c에 각각 정의 되어있음)
*/

/* Compares the value of two hash elements A and B, given
 * auxiliary data AUX.  Returns true if A is less than B, or
 * false if A is greater than or equal to B. */
/*두 해시 요소를 비교하여 더 작거나 큰 값 리턴*/
typedef bool hash_less_func (const struct hash_elem *a,
		const struct hash_elem *b,
		void *aux);


/*해시 element e 전체가 action을 수행할 수 있게 함*/
typedef void hash_action_func (struct hash_elem *e, void *aux);

/* Hash table. */
struct hash {
	size_t elem_cnt;            /* Number of elements in table. */ /*해시 테이블 요소의 개수*/
	size_t bucket_cnt;          /* Number of buckets, a power of 2. */ /*해시 테이블의 버킷의 개수 => 2의 지수승*/
	struct list *buckets;       /* Array of `bucket_cnt' lists. */ /*해시 함수를 통해 해싱될 값들이 list buckets에 담긴다.*/
	hash_hash_func *hash;       /* Hash function. */ /*해시 함수 - 키를 해시로 만들어주는 함수 (구현 필요)*/
	hash_less_func *less;       /* Comparison function. */ /*해시 요소들을 비교하는 함수(구현 필요)*/
	void *aux;                  /* Auxiliary data for `hash' and `less'. */
};
/*버킷이란 실제 값(key-value)이 저장되는 장소*/


/* A hash table iterator. */
struct hash_iterator {
	struct hash *hash;          /* The hash table. */
	struct list *bucket;        /* Current bucket. */
	struct hash_elem *elem;     /* Current hash element in current bucket. */
};

/* Basic life cycle. */
bool hash_init (struct hash *, hash_hash_func *, hash_less_func *, void *aux);
void hash_clear (struct hash *, hash_action_func *);
void hash_destroy (struct hash *, hash_action_func *);

/* Search, insertion, deletion. */
struct hash_elem *hash_insert (struct hash *, struct hash_elem *);
struct hash_elem *hash_replace (struct hash *, struct hash_elem *);
struct hash_elem *hash_find (struct hash *, struct hash_elem *);
struct hash_elem *hash_delete (struct hash *, struct hash_elem *);

/* Iteration. */
void hash_apply (struct hash *, hash_action_func *);
void hash_first (struct hash_iterator *, struct hash *);
struct hash_elem *hash_next (struct hash_iterator *);
struct hash_elem *hash_cur (struct hash_iterator *);

/* Information. */
size_t hash_size (struct hash *);
bool hash_empty (struct hash *);

/* Sample hash functions. */
uint64_t hash_bytes (const void *, size_t);
uint64_t hash_string (const char *);
uint64_t hash_int (int);

#endif /* lib/kernel/hash.h */
