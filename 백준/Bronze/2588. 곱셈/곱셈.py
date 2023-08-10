a = int(input())
b = input()

c1 = a*int(b[2])
c2 = a*int(b[1])
c3= a*int(b[0])

d = c1+(c2*10)+(c3*100)
print(c1, c2, c3, d, sep='\n')