N = int(input())

hansu = 0
for i in range(1,N+1):
    N_list = list(map(int,str(i)))
    if i < 100:
        hansu += 1 # 100보다 작으면 모두 한수
    elif N_list[0]-N_list[1] == N_list[1]-N_list[2]:
        hansu += 1 # x의 각 자리가 등차수열이면 한수
        
print(hansu)