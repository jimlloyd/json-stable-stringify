var test = require('tape');
var stringify = require('../');

test('nested', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    t.equal(stringify(obj), '{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
});

test('nested (sortarrays)', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,a:5,x:4},7], a: 3 };
    t.equal(stringify(obj, {sortarrays:true}), '{"a":3,"b":[7,{"a":5,"x":4,"z":6}],"c":8}');
});

test('nested (pretty)', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
    t.equal(stringify(obj, {pretty: true}), '{a:3,b:[{x:4,y:5,z:6},7],c:8}');
});

test('nested (pretty, sortarrays)', function (t) {
    t.plan(1);
    var obj = { c: 8, b: [{z:6,a:5,x:4},7], a: 3 };
    t.equal(stringify(obj, {pretty: true, sortarrays:true}), '{a:3,b:[7,{a:5,x:4,z:6}],c:8}');
});

test('cyclic (default)', function (t) {
    t.plan(1);
    var one = { a: 1 };
    var two = { a: 2, one: one };
    one.two = two;
    try {
    	stringify(one);
    } catch (ex) {
    	t.equal(ex.toString(), 'TypeError: Converting circular structure to JSON');
    }
});

test('cyclic (specifically allowed)', function (t) {
    t.plan(1);
    var one = { a: 1 };
    var two = { a: 2, one: one };
    one.two = two;
    t.equal(stringify(one, {cycles:true}), '{"a":1,"two":{"a":2,"one":"__cycle__"}}');
});

test('siblings are not cyclic', function (t) {
    t.plan(1);
    var one = { a: 1 };
    var two = { one: one, again: one };
    t.equal(stringify(two, {cycles:true, pretty: true}), '{again:{a:1},one:{a:1}}');
});

test('deeper cycle', function (t) {
    t.plan(1);
    var foo = {a: { b: { c: 0 } }};
    foo.a.b.c = foo;
    t.equal(stringify(foo, {cycles:true, pretty: true}), '{a:{b:{c:"__cycle__"}}}');
});
