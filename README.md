# bg-single-node
simple single node impl

# Usage
`var Node = require("@bears-garden/single-node");`  


### insert
places the new node before the one given
@returns new node

`var list = Node.insert(null,1);`  
`list = Node.insert(list,2);`

### append
places new node after the one given
@returns new node  

`var node = Node.append(list,2);`

### find
@returns the node

`var n = Node.find(list, 1);`

### predecessor
@returns node prior to 1

`var p = Node.predecessor(list,1);`

### remove
@returns the list

`list = Node.remove(list,2);`
