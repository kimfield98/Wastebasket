from collections import deque

# 컴퓨터의 수
N = int(input())
# 직접 연결되어 있는 컴퓨터 쌍의 수
M = int(input())

graph = [[] for _ in range(N+1)]
visited = [False] * (N+1)

for _ in range(M):
  a, b = map(int,input().split())
  graph[a].append(b)
  graph[b].append(a)

q = deque()

cnt = 0

q.append(1)
visited[1] = True

while q:
  com = q.popleft()
  for next_com in graph[com]:
    if visited[next_com] == True:
      continue
    cnt += 1
    q.append(next_com)
    visited[next_com] = True

print(cnt)