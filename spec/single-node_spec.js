/**
 * Created by arthuranderson on 3/12/17.
 */

describe("single-node", function() {
    "use strict";
    let SNode = require("../src/single-node");

    it("#ctor defaults", function() {
        let node = new SNode();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
    });

    it( "#insert_node", function() {
        let l = SNode.insert_node(null, 1);
        l = SNode.insert_node( l, 2 );
        expect( l.data ).toEqual( 2 );
        expect( l.next.data ).toEqual( 1 );
    });

    it( "#search_node", function() {
        let l = SNode.insert_node( null, 1);
        l = SNode.insert_node(l, 2);
        let s1 = SNode.search_node(l, 1);
        expect( s1.data ).toEqual( 1 );
        let s2 = SNode.search_node( l, 2);
        expect( s2.data ).toEqual( 2 );
    });

    it( "#predecessor", function() {
        let l = SNode.insert_node(null, 1);
        l = SNode.insert_node(l, 2);
        l = SNode.insert_node(l, 3);
        l = SNode.insert_node(l, 4);
        let p = SNode.predecessor(l, 4);
        expect(p).toEqual(null);
        p = SNode.predecessor(l, 3);
        expect(p.data).toEqual(4);
        p = SNode.predecessor(l, 2);
        expect(p.data).toEqual(3);
        p = SNode.predecessor(l, 1);
        expect(p.data).toEqual(2);
    });

    it( "#delete_node", function(){
        let l = SNode.insert_node(null, 1);
        l = SNode.insert_node(l, 2);
        l = SNode.insert_node(l, 3 );
        l = SNode.delete_node(l, 1);
        let count = 0;
        let node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data ).toEqual( node );
            node--;
            count++;
        }
        expect( count ).toEqual( 2 );
        l = SNode.delete_node( l, 2 );
        count = 0;
        node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data).toEqual( node );
            node--;
            count++;
        }
        expect( count).toEqual( 1 );
    });

    it( "#delete_node head", function() {
        let l = SNode.insert_node(null, 1);
        l = SNode.delete_node(l, 1);
        expect( l ).toEqual( null );
    })

    it( "#size", function(){
        let l = new SNode({data:1});
        l = SNode.insert_node(l, 2);
        expect( SNode.size( l )).toEqual( 2 );
        l = SNode.insert_node(l, 3 );
        expect( SNode.size( l ) ).toEqual( 3 );
    });
});
