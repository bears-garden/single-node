'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by arthuranderson on 3/13/17.
 */
var defaults = require('lodash.defaults');

var SingleNode = function () {
    function SingleNode(obj) {
        _classCallCheck(this, SingleNode);

        var defObj = { next: null, data: null };
        obj = defaults(obj, defObj);
        this.next = obj.next;
        this.data = obj.data;
    }

    _createClass(SingleNode, null, [{
        key: 'find',


        /**
         * search_node
         * @param l - list
         * @param obj - item
         * @returns {*} - node with item
         */
        value: function find(l, obj) {
            if (l === null) {
                return null;
            }
            if (l.data === obj) {
                return l;
            } else {
                return SingleNode.find(l.next, obj);
            }
        }
    }, {
        key: 'insert',


        /**
         * insert
         * @param n - node where to insert from - will be the next node
         * @param obj - item
         * @returns {SingleNode} - new node
         */
        value: function insert(head, obj) {
            return new SingleNode({ data: obj, next: head });
        }
    }, {
        key: 'append',


        /**
         * append
         * @param node - insert after this node
         * @param obj
         * @returns {*} returns new node
         */
        value: function append(node, obj) {
            if (node === null) {
                return SingleNode.insert(node, obj);
            } else {
                node.next = SingleNode.insert(null, obj);
                return node.next;
            }
        }

        /**
         * predecessor
         * @param n - node where to start find
         * @param obj - item to find
         * @returns {*} - node before item
         */

    }, {
        key: 'predecessor',
        value: function predecessor(n, obj) {
            if (n === null || n.next === null) {
                return null;
            }
            if (n.next.data === obj) {
                return n;
            } else {
                return SingleNode.predecessor(n.next, obj);
            }
        }
    }, {
        key: 'delete',


        /**
         * delete_node
         * @param n - node to begin deletion from
         * @param obj - item to remove
         * @returns {*} - returns updated n
         */
        value: function _delete(n, obj) {
            var p = null;

            p = SingleNode.find(n, obj);
            if (p !== null) {
                var pred = SingleNode.predecessor(n, obj);
                if (pred === null) {
                    n = p.next;
                } else {
                    pred.next = p.next;
                }
            }
            return n;
        }
    }, {
        key: 'size',


        /**
         * size
         * @param n - starting node to count
         * @returns {number} - number of nodes from starting node
         */
        value: function size(n) {
            var count = 0;
            for (var cur = n; cur !== null; cur = cur.next) {
                count++;
            }
            return count;
        }
    }]);

    return SingleNode;
}();

;

module.exports = SingleNode;