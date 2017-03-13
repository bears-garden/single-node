# bg-single-node
simple single node impl

# Usage
`var SNode = require("bg-single-node");`  


### insert
@returns new node

`var list = SNode.insert(null,1);`  
`list = SNode.insert(list,2);`
`var size = SNode.size(list);`  

### append 
@returns new node  

`var list = SNode.insert(null,1);`  
`var node = SNode.append(list,2);`

### find
@returns the node

`var n = SNode.find(list, 1);`

### predecessor
@returns node prior to 1

`var p = SNode.predecessor(list,1);`

### delete
@returns the list

`list = SNode.delete(list,2);`
