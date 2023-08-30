import sys
input = sys.stdin.readline
INF = sys.maxsize

N = int(input())
m = [[0]*(N+1) for _ in range(N+1)]

p = []
a,b = map(int,input().split())
p.append(a)
p.append(b)
for i in range(1, N):
    a,b = map(int,input().split())
    p.append(b)

# for i in range(1,N+1):
#     m[i][i] = 0 # 초깃값 셋팅 (i=j인 경우들)

for j in range(1, N+1) :
    for i in range(j-1, 0,-1) :
        min_value = INF
        for k in range(i,j) :
            temp_value = m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j]
            if min_value > temp_value :
                min_value = temp_value
        m[i][j]= min_value

print(m[1][N])