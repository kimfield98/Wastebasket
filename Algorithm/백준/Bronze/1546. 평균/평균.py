arr = []
N = int(input())
scores = list(map(int,input().split()))
max_score = max(scores)

for score in scores:
    new_score = score/max_score*100
    arr.append(new_score)

new_avr = sum(arr)/N
print(new_avr)