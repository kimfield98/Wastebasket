import sys
input = sys.stdin.readline

T = int(input())
for _ in range(T):
    N = int(input()) # 동전의 가지 수
    coins = list(map(int,input().split())) # 오름차순 정렬된 각 금액
    M = int(input()) # 받아야 할 금액

    dp = [0] * (M+1) # dp 테이블 만들기
    dp[0] = 1 # 0원은 무조건 1가지 방법 있음

    for coin in coins:
        for i in range(1,M+1):
            if i >= coin:
                dp[i] += dp[i-coin]

    print(dp[M])