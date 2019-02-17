"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Created by arthuranderson on 3/13/17.
 */
var defaults = require("lodash.defaults");

var isFunction = require("lodash.isfunction");

function defComparer(left, right) {
  "use strict";

  return left === right;
}

;

var SingleNode =
/*#__PURE__*/
function () {
  function SingleNode(obj) {
    _classCallCheck(this, SingleNode);

    var defObj = {
      next: null,
      data: null
    };
    obj = defaults(obj, defObj);
    this.next = obj.next;
    this.data = obj.data;
  }

  _createClass(SingleNode, null, [{
    key: "create_node",
    value: function create_node(d) {
      return new SingleNode({
        next: null,
        data: d
      });
    }
    /**
     * search_node
     * @param head - list
     * @param obj - item
     * @returns {*} - node with item
     */

  }, {
    key: "find_node",
    value: function find_node(head, obj, comparer) {
      comparer = isFunction(comparer) ? comparer : defComparer;

      if (head === null) {
        return null;
      }

      if (comparer(head.data, obj)) {
        return head;
      } else {
        return SingleNode.find_node(head.next, obj, comparer);
      }
    }
  }, {
    key: "insert",

    /**
     * insert
     * @param n - node where to insert from - will be the next node
     * @param obj - item
     * @returns {SingleNode} - new node
     */
    value: function insert(head, obj) {
      var newNode = SingleNode.create_node(obj);
      return SingleNode.insert_node(head, newNode);
    }
  }, {
    key: "insert_node",
    value: function insert_node(head, node) {
      if (!(node instanceof SingleNode)) {
        throw new TypeError("expecting node to be SingleNode");
      }

      if (node.next !== null) {
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

  }, {
    key: "append",
    value: function append(cur_node, obj) {
      var new_node = SingleNode.create_node(obj);
      return SingleNode.append_node(cur_node, new_node);
    }
  }, {
    key: "append_node",
    value: function append_node(cur_node, node) {
      if (cur_node === undefined || cur_node === null) {
        return node;
      }

      if (cur_node.next === null) {
        cur_node.next = node;
      } else {
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

  }, {
    key: "predecessor",
    value: function predecessor(head, obj, comparer) {
      comparer = isFunction(comparer) ? comparer : defComparer;

      if (head === null || head.next === null) {
        return null;
      }

      if (comparer(head.next.data, obj)) {
        return head;
      } else {
        return SingleNode.predecessor(head.next, obj, comparer);
      }
    }
  }, {
    key: "predecessor_node",
    value: function predecessor_node(head, n) {
      if (head === null || head.next === null) {
        return null;
      }

      if (head.next === n) {
        return head;
      } else {
        return SingleNode.predecessor_node(head.next, n);
      }
    }
    /**
     * delete_node
     * @param head - node to begin deletion from
     * @param obj - item to remove
     * @returns {*} - returns updated n
     */

  }, {
    key: "remove",
    value: function remove(head, obj, comparer) {
      var fnode = SingleNode.find_node(head, obj, comparer);
      return SingleNode.remove_node(head, fnode);
    }
  }, {
    key: "remove_node",
    value: function remove_node(head, rem_node) {
      if (rem_node === null) {
        return head;
      }

      var p_node = SingleNode.predecessor_node(head, rem_node);

      if (p_node === null) {
        // the removal node is the head
        head = rem_node.next;
      } else {
        p_node.next = rem_node.next;
      }

      return head;
    }
    /**
     * size
     * @param head - starting node to count
     * @returns {number} - number of nodes from starting node
     */

  }, {
    key: "size",
    value: function size(head) {
      var count = 0;

      for (var cur = head; cur !== null; cur = cur.next) {
        count++;
      }

      return count;
    }
  }, {
    key: "toArray",
    value: function toArray(head) {
      var len = SingleNode.size(head);
      var arr = new Array(len);

      for (var cur = head, idx = 0; cur !== null; cur = cur.next, idx++) {
        arr[idx] = cur.data;
      }

      return arr;
    }
  }, {
    key: "debugArray",
    value: function debugArray(head) {
      for (var cur = head, idx = 0; cur !== null; cur = cur.next, idx++) {
        console.log("[ idx=" + idx + ", data=" + JSON.stringify(cur.data) + "]");
      }
    }
  }]);

  return SingleNode;
}();

;
module.exports = SingleNode;