import sys
from collections import deque
input = sys.stdin.readline

queue = deque()
result = []

N, K = map(int,input().split())

for i in range(1,N+1):
    queue.append(i)
# print(queue)
# deque([1,2,3,4,5,6,7])

while queue:
    for i in range(K-1):
        queue.append(queue.popleft())
    result.append(queue.popleft())

print('<',end='')
print(*result,sep=', ',end='')
print('>')