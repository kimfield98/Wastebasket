# [백준 10819 차이를 최대로 파이썬](https://www.acmicpc.net/problem/10819)

from itertools import permutations
import sys
input = sys.stdin.readline

N = int(input()) # 정수의 개수
A = list(map(int,input().split())) # N개의 정수로 이루어진 배열

per = permutations(A)
ans = 0

for i in per:
    sum = 0
    for j in range(len(i)-1):
        sum += abs(i[j]-i[j+1])
        if sum > ans:
            ans = sum

print(ans)