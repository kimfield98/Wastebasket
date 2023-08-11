C = int(input())

for _ in range(C):
    nums = list(map(int,input().split()))
    avr = sum(nums[1:])/nums[0]

    count = 0
    for score in nums[1:]:
        if score > avr:
            count += 1
        
    print(f"{round(count/nums[0]*100,3)}%")
