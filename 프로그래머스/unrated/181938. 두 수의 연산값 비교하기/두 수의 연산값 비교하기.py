def solution(a, b):
    
    ab = str(a)+str(b)
    ab2 = 2*a*b

    if int(ab) > ab2:
        answer = int(ab)
    elif int(ab) < ab2:
        answer = ab2
    elif int(ab) == ab2:
        answer = int(ab)
        
    return answer