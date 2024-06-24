from collections import deque

T = int(input())

for _ in range(T):
    # 맵 한 변의 길이
    I = int(input())
    # 나이트가 현재 있는 칸
    fy, fx = map(int, input().split())
    # 나이트가 이동하려고 하는 칸
    ly, lx = map(int, input().split())

    # 현재 위치가 이동하려는 위치일 경우
    if (fy, fx) == (ly, lx):
        print(0)
        continue

    # 갈 수 있는 방향
    dy = [-2, -1, 1, 2, 2, 1, -1, -2]
    dx = [1, 2, 2, 1, -1, -2, -2, -1]

    # 갈 곳을 담을 큐
    q = deque()
    q.append((fy, fx))

    # 방문 체크
    visited = [[False] * I for _ in range(I)]
    visited[fy][fx] = True

    # 이동한 수
    count = 0
    # 도착 여부
    found = False

    while q and not found:
        # 반복문 끝날 때마다 카운트 올려주기
        for _ in range(len(q)):
            y, x = q.popleft()

            for next in range(8):
                ny = y + dy[next]
                nx = x + dx[next]

                if (0 <= ny < I and 0 <= nx < I) and not visited[ny][nx]:
                    # 목표 위치라면
                    if (ny, nx) == (ly, lx):
                        print(count + 1)
                        found = True
                        break

                    q.append((ny, nx))
                    visited[ny][nx] = True
            # 찾았으면 현재 레벨의 나머지 탐색 중단
            if found:
                break
        # 현재 레벨 끝난 뒤 count 증가    
        count += 1