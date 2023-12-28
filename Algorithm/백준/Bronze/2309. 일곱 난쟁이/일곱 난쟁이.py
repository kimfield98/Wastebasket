arr =[]
for _ in range(9):
    height = int(input())
    arr.append(height) # 입력받은 키(height) 9개를 배열에 담는다.

# arr = [arr[0],arr[1],arr[2] ... arr[7],arr[8]] 
for i in range(9):
    for j in range(i+1,9):
        if sum(arr)-arr[i]-arr[j] == 100:
            new =[]
            for idx in range(9):
                if idx == i or idx == j:
                    continue
                new.append(arr[idx])
new.sort()
for n in new:
    print(n)