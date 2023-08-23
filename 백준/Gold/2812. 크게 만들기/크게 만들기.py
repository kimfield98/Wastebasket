import sys
input = sys.stdin.readline

# n: 주어진 숫자의 개수, k: 제거할 숫자의 최대 개수
n, k = map(int, input().split())

# numbers: 주어진 숫자들을 문자열로 입력받음
numbers = input().rstrip()

# stack: 숫자들을 담을 스택
stack = []

# 주어진 숫자들을 하나씩 처리
for number in numbers:
    # 스택이 비어있지 않고, 스택의 가장 위의 숫자가 현재 숫자보다 작으며, 아직 제거 가능한 숫자가 남아있을 경우
    while stack and stack[-1] < number and k > 0:
        stack.pop()  # 스택의 가장 위 숫자를 제거하여 큰 수를 만듦
        k -= 1  # 제거 가능한 숫자 개수 감소
    stack.append(number)  # 현재 숫자를 스택에 추가

# 아직 제거 가능한 숫자가 남아있는 경우
if k > 0:
    print(''.join(stack[:-k]))  # 스택에서 뒤에서부터 최대 k개의 숫자를 제거하고 출력
else:
    print(''.join(stack))  # 모든 숫자를 사용하여 출력