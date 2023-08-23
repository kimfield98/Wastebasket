import sys
from collections import deque

input = sys.stdin.readline
n = int(input()) # 기본 부품이나 중간 부품

graph = [[] for _ in range(n+1)] # 연결 정보
needs = [[0]*(n+1) for _ in range(n+1)] # 각 제품을 만들 때 필요한 부품

q = deque()
degree = [0] * (n+1) # 진입 차수

m = int(input())
for _ in range(m):
    x,y,k = map(int,input().split())
    graph[y].append((x,k))
    degree[x] += 1

for i in range(1, n+1):
    if degree[i] == 0:
        q.append(i)

while q:
    now = q.popleft()

    # 현 제품의 다음 단계 번호, 현 제품이 얼마나 필요한지
    for next, next_need in graph[now]:
        # 만약 현 제품이 기본 부품이면
        if needs[now].count(0) == n+1:
            needs[next][now] += next_need
        # 현 제품이 중간 부품이면
        else:
            for i in range(1,n+1):
                needs[next][i] += needs[now][i] * next_need
        
        # 차수 -1
        degree[next] -= 1
        if degree[next] == 0:
            # 차수 0이면 큐에 넣음
            q.append(next)

for x in enumerate(needs[n]):
    if x[1] > 0:
        print(*x)