from collections import deque

N,M = map(int,input().split())

graph =[]
for _ in range(N):
  graph.append(list(map(int,input().split())))

q = deque()

dy = [1, 0, -1, 0, 1, -1, 1, -1]
dx = [0, 1, 0, -1, 1, -1, -1, 1]

INF = int(1e9)
visited = [[INF] * M for _ in range(N)]

# 상어의 위치를 기록하고 그곳의 안전거리를 0으로 둔 순회 목록에 넣는다
shark = []
for i in range(N):
  for j in range(M):
    if graph[i][j] == 1:
      visited[i][j] = 0
      shark.append((i,j,0))
      
for i in shark:
  q.append(i)

# 순회하면서 주변에 안전 거리들을 갱신한다
# 안전거리가 크면 더 작은 수로 갱신할 수 있다
# INF ... 3 .... 2 .. 1.... 상어가 코 앞! 꺅
while q:
  y,x,cnt = q.popleft()
  for next in range(8):
    ny = y + dy[next]
    nx = x + dx[next]

    if not (0 <= ny < N and 0 <= nx < M):
      continue
    if visited[ny][nx] <= cnt + 1:
      continue

    visited[ny][nx] = cnt + 1
    q.append((ny,nx,cnt+1))

maxCount = 0

for i in range(N):
  for j in range(M):
    if visited[i][j] > maxCount:
      maxCount = visited[i][j]

print(maxCount)