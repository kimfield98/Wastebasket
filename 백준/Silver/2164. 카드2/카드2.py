# 백기찬님 코드
import sys
from collections import deque

n = int(sys.stdin.readline())

queue = deque([i for i in range(1, n+1)])

for i in range(n):
    if len(queue) == 1:
        break
    else:
        queue.popleft()
        num = queue.popleft()
        queue.append(num)

for i in queue:
    print(i)