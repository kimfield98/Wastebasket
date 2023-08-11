T = int(input())

for _ in range(T):
    R,S = input().split()
    for ch in S:
        word = ch*int(R)
        print(word,end='')
    print()
        