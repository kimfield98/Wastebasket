import sys
input = sys.stdin.readline

n, k = map(int, input().split()) # 동전의 가지 수, 금액

# 동전 정보
coin = []
for i in range(n):
    coin.append(int(input()))

# dp 테이블    
dp = [10001] * (k+1)
dp[0] = 0

for c in coin:
    for i in range(c,k+1):
        if dp[i]>0:
            dp[i] = min(dp[i], dp[i-c]+1)

if dp[k]==10001:
    print(-1)
else:
    print(dp[k])