N = int(input())
num = N
# 사이클 수
cnt = 0

while 1:
    ten = num // 10 # 십의 자리 수
    one = num % 10 # 일의 자리 수
    new_one = (ten+one) % 10 # 새로운 수의 일의 자리 수
    num = one*10 + new_one

    cnt += 1
    if num == N:
        break

print(cnt)