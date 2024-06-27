from collections import deque

# 세로, 가로, 박스 개수
M, N, K = map(int,input().split())

# 맵
graph =[[False] * N for _ in range(M)]

# 좌표 받아오기
for _ in range(K):
    x1, y1, x2, y2 = map(int,input().split())
    # print(x1, y1, x2, y2)
    
    # 색칠하기
    for i in range(y1, y2):
        for j in range(x1, x2):
            graph[i][j] = True
    
# 흔적의 개수를 담을 공간
count_list = []

# 방문할 곳을 담을 큐
q = deque()
# 갈 수 있는 방향
dy = [1, 0, -1, 0]
dx = [0, 1, 0, -1]

# 슥 둘러보는데
for i in range(M):
    for j in range(N):
        if graph[i][j] == 0:
            # 0인데만 큐에 담아서 돌아보자
            q.append((i,j))
            graph[i][j] = True

            count = 0

            # BFS
            while q:
                y, x = q.popleft()

                # 간 곳 개수 세기
                count += 1

                for next in range(4):
                    ny = y + dy[next]
                    nx = x + dx[next]

                    # 범위를 벗어나면 continue
                    if not (0 <= ny < M and 0 <= nx < N):
                        continue
                    # next가 0일 때만 큐에 담기
                    if graph[ny][nx] == 0:
                        graph[ny][nx] = True
                        q.append((ny,nx))

            count_list.append(count)

count_list.sort()
print(len(count_list))
for i in count_list:
    print(i, end=" ")