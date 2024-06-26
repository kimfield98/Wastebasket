s=input() # s 문자열
n=int(input()) # n 단어개수
a=[input() for i in range(n)]#A 단어 입력
dp = [False for _ in range(len(s) + 1)] #인덱스를 기준으로 a에 포함된 문자열로 포함이 가능한지 체크
dp[0] = True # 만들 수 있음, 1

for i in range(len(s)): # s문자열 길이만큼 반복
    if not dp[i]: # 만약 해당 인덱스에 저장된 값이 False라면 다음으로
        continue

    for t in a: # 입력받은 a 단어들 꺼내기
        if s[i:i+len(t)] == t: # 비교하고 있는 인덱스~a 단어의 길이만큼에 해당하는 문자열을 비교하고, 현재 a에서 꺼낸 문자열과 동일하다면 있다면
            dp[i+len(t)] = True # 조합하여 만들 수 있으므로 현재 인덱스에 a단어길이 만큼 더함, 그 위치는 True로 바꾸기

result = dp[len(s)] # dp[len(s)] 에는 True/False 값이 저장되어 있다. 이를 숫자로 표현해야 하므로 int로 묶어주어야함
print(int(result)) # 확인하고자하는 문자열의 길이에 해당하는 index 값