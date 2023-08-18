T = int(input())
for _ in range(T):
    ps = input()
    stack = []
    for i in ps:
        if i == '(':
            stack.append(i)
        elif i == ')':
            if len(stack) == 0:
                stack.append(i)
                break
            stack.pop()
    if len(stack) == 0:
        print("YES")
    else:
        print("NO")
