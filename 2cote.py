# # DFS와 BFS 이해하기

# # deque 사용법
# from collections import deque
# q = deque()

# # queue 뒤집어서 출력하기
# q.reverse()

# # 리스트로 출력하기
# list(q)

# # 팩토리얼 반복적으로 구현하기
# def factorial_iterative(n):
#     result = 1
#     for i in range(1,n+1):
#         result *= i
#     return result
# # 팩토리얼 재귀적으로 구현하기
# def factorial_recursive(n):
#     if n <= 1:
#         return 1
#     return n * factorial_recursive(n-1)

# print(factorial_iterative(5))
# print(factorial_recursive(5))

# ###############################################

# # DFS
# def dfs(graph, v, visited):
#     visited[v] = True
#     print(v,end=' ')
#     for i in graph[v]:
#         if not visited[i]:
#             dfs(graph,i,visited)

# graph = [
#     [],
#     [2,3,8],
#     [1,7],
#     [1,4,5],
#     [3,5],
#     [3,4],
#     [7],
#     [2,6,8],
#     [1,7]
# ]

# visited = [False] * 9

# dfs(graph,1,visited)

# BFS
# from collections import deque

# def bfs(graph, start, visited):
#     q = deque([start])
#     visited[start] = True
#     while q:
#         v = q.popleft()
#         print(v,end=' ')
#         for i in graph[v]:
#             if not visited[i]:
#                 q.append(i)
#                 visited[i] = True

# graph = [
#     [],
#     [2,3,8],
#     [1,7],
#     [1,4,5],
#     [3,5],
#     [3,4],
#     [7],
#     [2,6,8],
#     [1,7]
# ]

# visited = [False] * 9

# bfs(graph,1,visited)

# [이코테] 음료수 얼려먹기
# n, m = map(int,input().split())
# graph = []
# for i in range(n):
#     graph.append(list(map(int,input())))

# def dfs(x,y):
#     if x <= -1 or x >= n or y <= -1 or y >= m:
#         return False
#     if graph[x][y] == 0:
#         graph[x][y] = 1
#         dfs(x-1,y)
#         dfs(x,y-1)
#         dfs(x+1,y)
#         dfs(x,y+1)
#         return True
#     return False

# result = 0
# for i in range(n):
#     for j in range(m):
#         if dfs(i,j) == True:
#             result += 1

# print(result)

# 미로 탈출
# from collections import deque

# n,m = map(int,input().split())
# graph = []
# for i in range(n):
#     graph.append(list(map(int,input())))

# dx = [-1,1,0,0]
# dy = [0,0,-1,1]

# def bfs(x,y):
#     q = deque()
#     q.append((x,y))
#     while q:
#         x,y = q.popleft()
#         for i in range(4):
#             nx = x + dx[i]
#             ny = y + dy[i]
#             if nx < 0 or ny < 0 or nx >= n or ny >= m:
#                 continue
#             if graph[nx][ny] == 0:
#                 continue
#             if graph[nx][ny] == 1:
#                 graph[nx][ny] = graph[x][y] + 1
#                 q.append((nx,ny))
#     return graph[n-1][m-1]

# print(bfs(0,0))

#######################################################

# 특정 거리의 도시 찾기

# from collections import deque

# n,m,k,x = map(int,input().split())
# graph = [[] for _ in range(n+1)]

# for _ in range(1,m+1):
#     a,b = map(int,input().split())
#     graph[a].append(b)

# # print(graph)

# distance = [-1] * (n+1)
# distance[x] = 0

# q = deque([x])
# while q:
#     now = q.popleft()
#     for next in graph[now]:
#         if distance[next] == -1:
#             distance[next] = distance[now] + 1
#             q.append(next)

# check = False
# for i in range(1,n+1):
#     if distance[i] == k:
#         print(i)
#         check = True

# if check == False:
#     print(-1)

########################################################

# 연구소
