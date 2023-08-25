import sys
input = sys.stdin.readline

T = int(input()) # 지폐의 금액
k = int(input()) # 동전의 가지 수

d = [0] * (T+1) # d[n] : n금액에 대한 동전 교환 방법 가지 수
d[0] = 1 # 0원은 아무 동전도 사용하지 않은 경우 있음

coin = [] # 동전 정보 저장
for i in range(k):
    coin_type, coin_cnt = map(int,input().split())
    coin.append((coin_type,coin_cnt))

# print(coin)

for coin_type,coin_cnt in coin:
    for money in range(T,0,-1): # T원부터 1원까지 거꾸로
        for i in range(1,coin_cnt+1): # 동전의 개수만큼
            if money - coin_type * i >= 0: # 0원 이상인 경우
                d[money] += d[money-coin_type*i]

print(d[T])