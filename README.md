# bg-single-node
simple single node impl

# Usage
`var SNode = require("bg-single-node");`  

## insert into a list
@returns list node

`var list = SNode.insert_node(null,1);`  
`list = SNode.insert_node(list,2);`
`var size = SNode.size(list);`  

## search
@returns node with the item

`var n = SNode.search_node(list, 1);`

## predecessor
@returns node before the items

`var p = SNode.predecessor(list,1);`

## delete
@returns the list

`list = SNode.delete_node(list,2);`
