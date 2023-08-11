T = int(input())
for _ in range(T):
    word = list(input())
    count = 0
    count_plus = 0
    
    for i in word:
        if i == 'O':
            count += 1
            count_plus += count
        else:
            count = 0

    print(count_plus)
