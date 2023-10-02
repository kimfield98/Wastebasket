def solution(my_string, overwrite_string, s):
    
    over_len = len(overwrite_string)
    
    my = my_string[0:int(s)]
    string = my_string[int(s)+over_len:]
    
    answer = my+overwrite_string[0:over_len]+string
    
    return answer