N, r, c = map(int,input().split())
global ans
ans = 0

def recur(x,y,length):
    global ans
    half = length//2
    if x == c and y == r:
        print(ans)
        exit()
    if x <= c and c < x+length and y <= r and r< y+length:
       recur(x,y,half)
       recur(x+half,y,half)
       recur(x,y+half,half)
       recur(x+half,y+half,half)
    else:
	    ans += length**2
            
recur(0,0,2**N)
    
