from collections import deque

T = int(input())

for _ in range(T):
  M, N, K = map(int,input().split())
  # 맵
  graph = [[0] * M for _ in range(N)]

  for _ in range(K):
    x, y = map(int,input().split())
    graph[y][x] = 1

  # 갈 곳을 담을 큐
  q = deque()

  # 방향
  dy = [1, 0, -1, 0]
  dx = [0, 1, 0, -1]

  # 구역 수
  count = 0

  for i in range(N):
    for j in range(M):
      if graph[i][j] == 1:
        q.append((i,j))
        graph[i][j] = 0
        count += 1

        while q:
          y, x = q.popleft()

          for next in range(4):
            ny = y + dy[next]
            nx = x + dx[next]

            if (0 <= ny < N and 0 <= nx < M) and graph[ny][nx] == 1:
              q.append((ny,nx))
              graph[ny][nx] = 0

  print(count)