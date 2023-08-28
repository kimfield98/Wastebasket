import sys
input = sys.stdin.readline

T = int(input()) # 테스트 케이스 수

for _ in range(T):
    N = int(input()) # 지원자의 수
    arr = []
    for _ in range(N):
        s,m = map(int,input().split()) # 서류 점수, 면접 점수
        arr.append((s,m))
    # 오름차순 정렬
    arr.sort()

    start = arr[0][1]
    cnt = 1
    for i in range(1,len(arr)):
        if start > arr[i][1]:
            cnt += 1
            start = arr[i][1]
    
    print(cnt)