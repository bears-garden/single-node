/**
 * Created by arthuranderson on 3/12/17.
 */

describe("single-node", function() {
    "use strict";
    let SNode = require("../lib/index");

    it("#ctor defaults", function() {
        let node = new SNode();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
    });

    it( "#insert empty", function() {
        let l = SNode.insert(null, 1);
        expect( l.data ).toEqual( 1 );
        expect( l.next ).toEqual( null );
    });

    it( "#insert multiple ", function() {
        let l = null;
        for( let idx = 1; idx < 11; idx++ ) {
            l = SNode.insert(l, idx);
        }
        let n = l;
        for( let idx = 10; idx > 0; idx-- ){
            expect( n.data ).toEqual( idx );
            n = n.next;
        }
    });

    it( "#append empty", function() {
        let l = SNode.append(null, 1);
        expect( l.data ).toEqual( 1 );
        expect( l.next ).toEqual( null );
    });

    it( "#append multiple ", function() {
        let l = SNode.insert( null, 1 );
        let tail = l;
        for( let idx = 2; idx < 11; idx++ ) {
            tail = SNode.append(tail, idx);
        }
        let n = l;
        for( let idx = 1; idx < 11; idx++ ){
            expect( n.data ).toEqual( idx );
            n = n.next;
        }
    });

    it( "#find", function() {
        let l = SNode.insert( null, 1);
        l = SNode.insert(l, 2);
        let s1 = SNode.find(l, 1);
        expect( s1.data ).toEqual( 1 );
        let s2 = SNode.find( l, 2);
        expect( s2.data ).toEqual( 2 );
    });

    it( "#predecessor", function() {
        let l = SNode.insert(null, 1);
        l = SNode.insert(l, 2);
        l = SNode.insert(l, 3);
        l = SNode.insert(l, 4);
        let p = SNode.predecessor(l, 4);
        expect(p).toEqual(null);
        p = SNode.predecessor(l, 3);
        expect(p.data).toEqual(4);
        p = SNode.predecessor(l, 2);
        expect(p.data).toEqual(3);
        p = SNode.predecessor(l, 1);
        expect(p.data).toEqual(2);
    });

    it( "#remove", function(){
        let l = SNode.insert(null, 1);
        l = SNode.insert(l, 2);
        l = SNode.insert(l, 3 );
        l = SNode.remove(l, 1);
        let count = 0;
        let node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data ).toEqual( node );
            node--;
            count++;
        }
        expect( count ).toEqual( 2 );
        l = SNode.remove( l, 2 );
        count = 0;
        node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data).toEqual( node );
            node--;
            count++;
        }
        expect( count).toEqual( 1 );
    });

    it( "#remove head", function() {
        let l = null;
        l = SNode.insert(l, 1);
        l = SNode.remove(l, 1);
        expect( l ).toEqual( null );
    })

    it( "#size", function(){
        let l = null;
        l = SNode.insert(l, 1);
        l = SNode.insert(l, 2);
        expect( SNode.size( l )).toEqual( 2 );
        l = SNode.insert(l, 3 );
        expect( SNode.size( l ) ).toEqual( 3 );
    });
});
