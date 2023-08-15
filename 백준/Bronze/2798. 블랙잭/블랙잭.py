# 3장의 카드를 뽑는다.
# 3장의 합은 M을 넘지 않는다.
# 합과 M의 abs(차이)가 가장 작은 수를 출력한다.

N,M = map(int,input().split())
cards = list(map(int,input().split()))
arr = []

# 입력받은 카드들의 개수만큼 순회한다. 인덱스에 접근하기 위함.
for i in range(len(cards)):
    for j in range(i+1,len(cards)):
        for k in range(j+1,len(cards)):
            # 카드 3장의 합
            sum_3 = cards[i]+cards[j]+cards[k]
            # 카드 3장의 합은 M을 넘지 않아야 한다.
            if sum_3 <= M:
                arr.append(sum_3)

print(max(arr))