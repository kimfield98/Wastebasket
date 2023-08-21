N = int(input()) # 탑의 개수
tops = list(map(int,input().split())) # 탑들의 높이를 리스트에 담는다.
result = [0] * N # 결과를 담을 변수
stack = [] # 탑의 인덱스와 높이를 튜플로 저장

for i in range(N):
    while stack:
        if stack[-1][1] > tops[i]:
            result[i] = stack[-1][0] + 1
            break
        else:
            stack.pop()
    stack.append([i, tops[i]])

print(*result)