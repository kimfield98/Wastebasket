import sys
input = sys.stdin.readline

def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b):
    a = find(parent, a)
    b = find(parent, b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b

v, e = map(int, input().split())

parent = [0] * (v+1)
for i in range(1, v+1):
    parent[i] = i

edges = []
for _ in range(e):
    a, b, c = map(int, input().split())
    edges.append((c, a, b))
edges.sort()

res = 0

for i in edges:
    c, a, b = i
    if find(parent, a) != find(parent, b):
        union(parent, a, b)
        res += c

print(res)