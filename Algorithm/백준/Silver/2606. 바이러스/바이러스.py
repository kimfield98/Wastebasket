from collections import deque

# 컴퓨터의 수
v = int(input())
# 네트워크 쌍 개수
e = int(input())
graph = [[] for _ in range(v+1)]
for _ in range(e):
    a, b = map(int, input().split())
    # 연결된 컴퓨터의 정보가 언제가 1부터 등장한다는 보장 x
    graph[a].append(b)
    graph[b].append(a)


# 큐 구현
def bfs(x):
    q = deque([x])
    count = 0
    visited[x] = True
    while q:
        node = q.popleft()
        for next_node in graph[node]:
            if not visited[next_node]:
                visited[next_node] = True
                q.append(next_node)
                count += 1

    return count

visited = [False for _ in range(v+1)]
print(bfs(1))