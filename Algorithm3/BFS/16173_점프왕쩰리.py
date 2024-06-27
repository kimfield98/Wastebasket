from collections import deque

# 게임 구역의 크기
N = int(input())

graph = []

# 게임판의 구역(맵)
for _ in range(N): 
    graph.append(list(map(int,input().split())))

# 시작 위치
start = (0,0)

# 방문할 노드들을 담을 곳
q = deque()
q.append(start)

# 게임판 이동 방향
dy = [1,0]
dx = [0,1]

arrive = False

# 모든 노드에 대해 검사(bfs)
while q:
    y, x = q.popleft()
    jump = graph[y][x]
    if jump == -1:
        print("HaruHaru")
        arrive = True
        break
    if jump == 0:
        continue
    for i in range(2):
        ny = y + jump * dy[i]
        nx = x + jump * dx[i]
        if 0 <= ny < N and 0 <= nx < N:
            q.append((ny,nx))

if arrive == False:
    print("Hing")