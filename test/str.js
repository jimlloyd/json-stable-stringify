var test = require('tape');
var stringify = require('../');

test('simple object', function (t) {
    t.plan(1);
    var obj = { c: 6, b: [4,5], a: 3, z: null };
    t.equal(stringify(obj), '{"a":3,"b":[4,5],"c":6,"z":null}');
});

test('object with undefined', function (t) {
	t.plan(4);
	var obj = { a: 3, z: undefined };
	t.equal(stringify(obj), '{"a":3}');
  t.equal(stringify(obj, {undef: true}), '{"a":3,"z":undefined}');
  t.equal(stringify(obj, {undef: true, pretty: true}), '{a:3,z:undefined}');
  t.equal(stringify(obj, {undef: true, pretty: true, space: 2}), '{\n  a: 3,\n  z: undefined\n}');
});

test('array with undefined', function (t) {
	t.plan(2);
	var obj = [4, undefined, 6];
  t.equal(stringify(obj), '[4,undefined,6]');
  t.equal(stringify(obj, {undef: true}), '[4,undefined,6]');
});

test('object with empty string', function (t) {
	t.plan(1);
	var obj = { a: 3, z: '' };
	t.equal(stringify(obj), '{"a":3,"z":""}');
});

test('array with empty string', function (t) {
	t.plan(1);
	var obj = [4, '', 6];
	t.equal(stringify(obj), '[4,"",6]');
});

test('array with empty string (pretty)', function (t) {
	t.plan(1);
	var obj = [4, '', 6];
	t.equal(stringify(obj, {pretty:true}), "[4,'',6]");
});

test('eval of hand formatted stringified object containing string with embedded single quote', function (t) {
  t.plan(1);
  var jsonstr = "({a: 'boo', b: 'b\\\'ar'})";
  var expected = {a: 'boo', b: 'b\'ar'};
  t.deepEqual(eval(jsonstr), expected);
});

test('round trip of object containing string value with embedded single quote (pretty)', function (t) {
	t.plan(1);
  var expected = {a: 'boo', b: 'b\'ar'};
	var jsonstr = '(' + stringify(expected, {pretty:true}) + ')';
  t.deepEqual(eval(jsonstr), expected);
});

test('round trip of object containing string value with embedded double quote', function (t) {
	t.plan(1);
  var expected = {a: "boo", b: "b\"ar"};
	var jsonstr = '(' + stringify(expected) + ')';
  t.deepEqual(eval(jsonstr), expected);
});
