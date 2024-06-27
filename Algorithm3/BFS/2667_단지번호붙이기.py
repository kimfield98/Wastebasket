from collections import deque

# 지도의 크기 N*N (5≤N≤25)
N = int(input())
graph = []
for _ in range(N):
  graph.append(input())

village = [[0] * N for _ in range(N)]
for i in range(N):
  for j in range(N):
    village[i][j] = int(graph[i][j]) * -1
# print(village)

# 갈 수 있는 방향
dy = [1, 0, -1, 0]
dx = [0, 1, 0, -1]

# 갈 곳을 담을 큐
q = deque()

# 단지 넘버
village_num = 1

# 단지내 집의 수
counts = []

for i in range(N):
  for j in range(N):
    if village[i][j] == -1:
      q = deque()
      q.append((i,j))
      village[i][j] = village_num
      count = 1

      while q:
        y, x = q.popleft()

        for next in range(4):
          ny = y + dy[next]
          nx = x + dx[next]

          if not (0 <= ny < N and 0 <= nx < N):
            continue
          if village[ny][nx] == -1:
            q.append((ny,nx))
            village[ny][nx] = village_num
            count += 1

      village_num += 1
      counts.append(count)

print(village_num-1)
counts.sort()
for i in counts:
  print(i)
