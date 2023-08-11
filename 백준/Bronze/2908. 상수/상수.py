A,B = input().split()

re_A = A[::-1]
re_B = B[::-1]

if re_A > re_B:
    print(re_A)
else:
    print(re_B)