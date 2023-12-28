import sys
input = sys.stdin.readline

n = int(input())
a = list(map(int,input().split()))
dp = [1] * n # LIS 기본적인 길이 1 (자기 자신)

for i in range(n):
    for j in range(i):
        if a[i] > a[j]:
            dp[i] = max(dp[i],dp[j]+1)

print(max(dp))