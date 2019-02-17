/**
 * Created by arthuranderson on 3/13/17.
 */
const defaults = require("lodash.defaults");
const isFunction = require("lodash.isfunction");

function defComparer( left, right ){
    "use strict";
    return left === right;
};

class SingleNode{
    constructor( obj ){
        let defObj = { next: null, data:null };
        obj = defaults( obj, defObj );
        this.next = obj.next;
        this.data = obj.data;
    };

    static create_node( d ){
        return new SingleNode({next:null, data:d} );
    }
    /**
     * search_node
     * @param head - list
     * @param obj - item
     * @returns {*} - node with item
     */
    static find_node(head, obj, comparer ){
        comparer = ( isFunction( comparer ) ) ? comparer: defComparer;

        if( head === null ){
            return null;
        }
        if( comparer( head.data, obj ) ){
            return head;
        }else{
            return SingleNode.find_node( head.next, obj, comparer );
        }
    };

    /**
     * insert
     * @param n - node where to insert from - will be the next node
     * @param obj - item
     * @returns {SingleNode} - new node
     */
    static insert(head, obj ){
        let newNode = SingleNode.create_node( obj );
        return SingleNode.insert_node( head, newNode );
    };

    static insert_node( head, node ){
        if( !(node instanceof SingleNode) ){
            throw new TypeError("expecting node to be SingleNode");
        }
        if( node.next !== null ){
            head.next = node.next;
        }
        node.next = head;
        return node;
    }
    /**
     * append
     * @param cur_node - insert after this node
     * @param obj
     * @returns {*} returns new node
     */
    static append( cur_node, obj ){
        let new_node = SingleNode.create_node(obj);
        return SingleNode.append_node( cur_node, new_node );
    }

    static append_node( cur_node, node ){
        if( cur_node === undefined || cur_node === null ){
            return node;
        }
        if( cur_node.next === null ){
            cur_node.next = node;
        }else{
            node.next = cur_node.next;
            cur_node.next = node;
        }
        return cur_node.next;
    }

    /**
     * predecessor
     * @param head - node where to start find_node
     * @param obj - item to find_node
     * @returns {*} - node before item
     */
    static predecessor( head, obj, comparer ){
        comparer = ( isFunction( comparer ) ) ? comparer: defComparer;

        if( head === null || head.next === null ){
            return null;
        }
        if( comparer( head.next.data, obj ) ){
            return head;
        }else{
            return SingleNode.predecessor(head.next, obj, comparer);
        }
    };

    static predecessor_node( head, n ){
        if( head === null || head.next === null ){
            return null;
        }
        if( head.next === n ){
            return head;
        }else{
            return SingleNode.predecessor_node( head.next, n );
        }
    }

    /**
     * delete_node
     * @param head - node to begin deletion from
     * @param obj - item to remove
     * @returns {*} - returns updated n
     */
    static remove( head, obj, comparer ){
        let fnode = SingleNode.find_node( head, obj, comparer );
        return SingleNode.remove_node(head, fnode);
    };

    static remove_node( head, rem_node ){
        if( rem_node === null ){
            return head;
        }
        let p_node = SingleNode.predecessor_node(head, rem_node);
        if( p_node === null ){ // the removal node is the head
            head = rem_node.next;
        }else {
            p_node.next = rem_node.next;
        }
        return head;
    }
    /**
     * size
     * @param head - starting node to count
     * @returns {number} - number of nodes from starting node
     */
    static size( head ){
        let count = 0;
        for( let cur = head; cur !== null; cur = cur.next ){
            count++;
        }
        return count;
    };

    static toArray( head ){
        let len = SingleNode.size(head);
        let arr = new Array(len);

        for( let cur = head, idx = 0; cur !== null; cur = cur.next, idx++ ){
            arr[idx] = cur.data;
        }
        return arr;
    };
    static debugArray( head ){
        for( let cur = head, idx = 0; cur !== null; cur = cur.next, idx++ ){
            console.log( "[ idx=" + idx + ", data=" + JSON.stringify(cur.data) + "]");
        }
    }
};

module.exports = SingleNode;
