from collections import deque

# 세로, 가로
N,M = map(int, input().split())

graph =[]

# 미로
for _ in range(N):
  graph.append(list(input()))

# 시작위치, 거리
start = (0,0,1)

# 갈 수 있는 방향
dy = [1, 0, -1, 0]
dx = [0, 1, 0, -1]

# 갈 곳을 담을 큐
q = deque()
q.append(start)

# 무한대 값
INF = 99999999

# 방문 위치 기록 (최단거리 갱신)
visited = [[INF] * M for _ in range(N)]
visited[0][0] = 1

# 미로 탐방
while q:
  y,x,cnt = q.popleft()

  # 도착 지점에 도달했을 때
  if y == N-1 and x == M-1:
      print(cnt)
      break
  
  for next in range(4):
    ny = y + dy[next]
    nx = x + dx[next]

    # 범위 밖이면 continue
    if not (0 <= ny <N and 0 <= nx <M):
      continue

    # 가려는 곳이 0이면 continue
    if int(graph[ny][nx]) == 0:
      continue

    # 방문했으면 continue
    if visited[ny][nx] <= cnt + 1:
      continue

    q.append((ny,nx,cnt+1))
    visited[ny][nx] = cnt + 1