num = map(int,input().split())
result = 0

for i in num:
    result += i*i

print(result%10)