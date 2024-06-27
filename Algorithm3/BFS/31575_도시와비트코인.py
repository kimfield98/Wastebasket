from collections import deque

# 도시의 가로 크기와 세로 크기
N,M = map(int,input().split())

# 도시의 형태
graph = []
for i in range(M):
  graph.append(list(map(int,input().split())))
# print(graph)

# 시작 위치
start = (0,0)

# 갈 수 있는 방향
dy = [1,0]
dx = [0,1]

# 갈 곳을 담을 큐
q = deque()
q.append(start)

# 방문 확인
visited = [[False] * N for _ in range(M)]
# print(visited)

# 도시를 순회
while q:
  y,x = q.popleft()

  # 현재 위치가 거래소이면 Yes 출력
  if (y,x) == (M-1,N-1):
    print("Yes")
    break

  # 다음 위치
  for next in range(2):
    ny = y + dy[next]
    nx = x + dx[next]

    # 범위 밖이면 continue
    if not (0 <= nx < N and 0 <= ny < M):
      continue

    # 못가는 경우 continue
    if graph[ny][nx] == 0:
      continue

    # 이미 방문 했으면 continue
    if visited[ny][nx] == True:
      continue

    q.append((ny,nx))
    visited[ny][nx] = True

else:
  print("No")
