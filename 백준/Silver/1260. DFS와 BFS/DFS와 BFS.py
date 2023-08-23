import sys
from collections import deque
input = sys.stdin.readline

def dfs(start):
    visited[start] = True
    print(start, end=' ')

    for i in graph[start]:
        if not visited[i]:
            dfs(i)


def bfs(start):
    q = deque([start])
    visited[start] = True

    while q:
        v = q.popleft()
        print(v,end=' ')

        for i in graph[v]:
            if not visited[i]:
                visited[i] = True
                q.append(i)

# 정점의 개수, 간선의 개수, 탐색을 시작할 정점의 번호
n, m, v = map(int,input().split())
graph = [[] for _ in range(n+1)]

for _ in range(m):
    a, b = map(int,input().split())
    graph[a].append(b)
    graph[b].append(a)

for i in graph:
    i.sort()
    
# dfs
visited = [False] * (n+1)
dfs(v)
print()

# bfs
visited = [False] * (n+1)
bfs(v)