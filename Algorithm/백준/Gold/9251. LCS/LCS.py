import sys
input = sys.stdin.readline

word1 = input().strip()
word2 = input().strip()
L1, L2 = len(word1), len(word2)
cache = [0] * L2

for i in range(L1):
    cnt = 0
    for j in range(L2):
        if cnt < cache[j]:
            cnt = cache[j]
        elif word1[i] == word2[j]:
            cache[j] = cnt + 1
print(max(cache))