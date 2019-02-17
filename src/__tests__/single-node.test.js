/**
 * Created by arthuranderson on 3/12/17.
 */
import UuidV1 from 'uuid/v1';
import Node from '../single-node';

describe("single-node", function() {
    "use strict";

    test("#ctor defaults", function() {
        let node = new Node();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
    });

    test( "#insert empty", function() {
        let l = Node.insert(null, 1);
        expect( l.data ).toEqual( 1 );
        expect( l.next ).toEqual( null );
    });

    test( "#insert multiple ", function() {
        let l = null;
        for( let idx = 1; idx < 11; idx++ ) {
            l = Node.insert(l, idx);
        }
        let n = l;
        for( let idx = 10; idx > 0; idx-- ){
            expect( n.data ).toEqual( idx );
            n = n.next;
        }
    });

    test( "#append empty", function() {
        let l = Node.append(null, 1);
        expect( l.data ).toEqual( 1 );
        expect( l.next ).toEqual( null );
    });

    test( "#append multiple ", function() {
        let l = Node.insert( null, 1 );
        let tail = l;
        for( let idx = 2; idx < 11; idx++ ) {
            tail = Node.append(tail, idx);
        }
        let n = l;
        for( let idx = 1; idx < 11; idx++ ){
            expect( n.data ).toEqual( idx );
            n = n.next;
        }
    });

    test( "#find_node", function() {
        let l = Node.insert( null, 1);
        l = Node.insert(l, 2);
        let s1 = Node.find_node(l, 1 );
        expect( s1.data ).toEqual( 1 );
        let s2 = Node.find_node( l, 2 );
        expect( s2.data ).toEqual( 2 );
    });

    test( "#predecessor", function() {
        let l = Node.insert(null, 1);
        l = Node.insert(l, 2);
        l = Node.insert(l, 3);
        l = Node.insert(l, 4);
        let p = Node.predecessor(l, 4);
        expect(p).toEqual(null);
        p = Node.predecessor(l, 3);
        expect(p.data).toEqual(4);
        p = Node.predecessor(l, 2);
        expect(p.data).toEqual(3);
        p = Node.predecessor(l, 1);
        expect(p.data).toEqual(2);
    });

    test( "#remove", function(){
        let l = Node.insert(null, 1);
        l = Node.insert(l, 2);
        l = Node.insert(l, 3);
        l = Node.remove(l, 1);
        let arrValues = Node.toArray( l );
        let node = 3;
        arrValues.forEach( function( v ){
            expect( v ).toBe( node--);
        });
        expect( Node.size(l) ).toEqual( 2 );

        l = Node.remove( l, 2 );
        node = 3;
        arrValues = Node.toArray( l );
        arrValues.forEach( function(v){
            expect(v).toBe( node-- );
        });
        expect( Node.size(l) ).toEqual( 1 );
    });

    test( "#remove head", function() {
        let l = null;
        l = Node.insert(l, 1);
        l = Node.remove(l, 1);
        expect( l ).toEqual( null );
    })

    test( "#size", function(){
        let l = null;
        l = Node.insert(l, 1);
        l = Node.insert(l, 2);
        expect( Node.size( l )).toEqual( 2 );
        l = Node.insert(l, 3 );
        expect( Node.size( l ) ).toEqual( 3 );
    });

    test( "#create_node", function() {
        let l = Node.create_node( 1 );
        expect( l.data).toBe( 1 );
        expect( l.next ).toBe( null );
    });

    test( "#insert_node", function() {
        let l = Node.create_node( 1 );
        let node = Node.create_node( 2 );
        let ret = Node.insert_node( l, node );
        expect( Node.size(ret) ).toBe( 2 );
        expect( node.next ).toBe( l );
        expect( l.next ).toBe( null );
        expect( ret ).toBe( node );
    });

    test( "#append_node", function() {
        let l = Node.create_node( 1 );
        let node = Node.create_node( 2 );
        let ret = Node.append_node( l, node );
        expect( Node.size( l ) ).toBe( 2 );
        expect( ret ).toBe( node );
        expect( l.next ).toBe( node );
        expect( node.next ).toBe( null );
    });

    function equalsID( l, r ){ return l.id === r.id; };

    test( "#find_node with callback", function() {
        let values = new Array(10);
        for( let idx = 0; idx < 10; idx++ ){
            values[idx] = { id:UuidV1() };
        }
        let head = null;
        for( let idx = 0; idx < 10; idx++ ){
            let node = Node.create_node( values[idx]);
            head = Node.insert_node( head, node );
        }

        let node = Node.find_node( head, values[6], equalsID );
        expect( node.data ).toBe( values[6] );
    });

    test("#remove_node", function() {
        let values = new Array(10);
        for( let idx = 0; idx < 10; idx++ ){
            values[idx] = { id:UuidV1() };
        }
        let head = null;
        for( let idx = 0; idx < 10; idx++ ){
            let node = Node.create_node( values[idx]);
            head = Node.insert_node( head, node );
        }
        let val = values[3];
        let found_node = Node.find_node( head, val, equalsID );
        expect( found_node.data ).toBe( val );
        head = Node.remove_node( head, found_node, equalsID );
        expect( Node.size( head ) ).toBe(9);
    })
});
