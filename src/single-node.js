/**
 * Created by arthuranderson on 3/13/17.
 */
const defaults = require('lodash.defaults');

class SingleNode{
    constructor( obj ){
        let defObj = { next: null, data:null};
        obj = defaults( obj, defObj );
        this.next = obj.next;
        this.data = obj.data;
    };

    /**
     * search_node
     * @param l - list
     * @param obj - item
     * @returns {*} - node with item
     */
    static search_node( l, obj ){
        if( l === null ){
            return null;
        }
        if( l.data === obj ){
            return l;
        }else{
            return SingleNode.search_node( l.next, obj );
        }
    };

    /**
     * insert_node
     * @param n - node where to insert from - will be the next node
     * @param obj - item
     * @returns {SingleNode} - new node - with n as next
     */
    static insert_node( n, obj ){
        return new SingleNode( { data: obj, next: n } );
    };

    /**
     * predecessor
     * @param n - node where to start search
     * @param obj - item to find
     * @returns {*} - node before item
     */
    static predecessor( n, obj ){
        if( n === null || n.next === null ){
            return null;
        }
        if( n.next.data === obj ){
            return n;
        }else{
            return SingleNode.predecessor(n.next, obj);
        }
    };

    /**
     * delete_node
     * @param n - node to begin deletion from
     * @param obj - item to remove
     * @returns {*} - returns updated n
     */
    static delete_node( n, obj ){
        let p = null;

        p = SingleNode.search_node( n, obj );
        if( p !== null ){
            let pred = SingleNode.predecessor(n, obj );
            if( pred === null ){
                n = p.next;
            }else{
                pred.next = p.next;
            }
        }
        return n;
    };

    /**
     * size
     * @param n - starting node to count
     * @returns {number} - number of nodes from starting node
     */
    static size( n ){
        let count = 0;
        for( let cur = n; cur !== null; cur = cur.next ){
            count++;
        }
        return count;
    };
};

module.exports = SingleNode;
