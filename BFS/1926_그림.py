from collections import deque

# 세로, 가로
N, M = map(int,input().split())

# 맵
graph = [list(map(int,input().split())) for _ in range(N)]

# 방향
dy = [1, 0, -1, 0]
dx = [0, 1, 0, -1]

# 큐
q = deque()

# 각 그림의 넓이를 담을 리스트
count_list = []

# 맵을 돌며 1인 구역 찾아 큐에 넣기
for i in range(N):
  for j in range(M):
    if graph[i][j] == 1:
      q.append((i,j))
      graph[i][j] = 0

      count = 1

      # 1인 구역 주변 탐색하기 BFS
      while q:
        y, x = q.popleft()

        # 네 방향 탐색하기
        for next in range(4):
          ny = y + dy[next]
          nx = x + dx[next]

          # 범위 밖이면 continue
          if (0 <= ny < N and 0 <= nx < M) and graph[ny][nx] == 1:
            q.append((ny,nx))
            graph[ny][nx] = 0
            count += 1

      count_list.append(count)

print(len(count_list))
if len(count_list) == 0:
  print(0)
else:
  print(max(count_list))