import sys
input = sys.stdin.readline


n, weights = int(input()), list(map(int, input().split()))
m, target = int(input()), list(map(int, input().split()))

# 추의 무게는 최대 500이므로 [[추의 개수*500]*추의 개수]로 배열을 구성한다.
dp = [[0 for j in range((i)*500+1)] for i in range(n+1)]

def cal(num,weight):
    if num > n:
        return 
    
    if dp[num][weight]:
        return
    
    dp[num][weight] = 1
    
    cal(num+1, weight)
    cal(num+1, weight+weights[num-1])
    cal(num+1, abs(weight-weights[num-1]))
    
cal(0,0)

for t in target:
  # 만들 수 있는 구슬의 무게는 30*500이 최대임
  if t > 30*500:  print("N", end=" ") 
  elif dp[n][t]: print("Y", end=" ")
  else:  print("N", end=" ")