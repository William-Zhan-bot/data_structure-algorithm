nums=[1,2,3,4]
# nums=[-1,-1,0,3,3]
ans=[]
def rec(cur, lst):
    if len(lst) == 0:
        ans.append(cur)
        return cur
    else:
        return rec(cur*lst.pop(0), lst)
    
for i in range(len(nums)):
    nums2=nums[:i] + nums[i+1:]
    rec(1,nums2)
print(ans)