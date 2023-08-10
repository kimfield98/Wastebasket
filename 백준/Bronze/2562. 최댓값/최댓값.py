array =[]

for _ in range(9):
    N = int(input())
    array.append(N)

max_value = max(array)
print(max_value,array.index(max_value)+1, sep='\n')