var test = require('tape');
var stringify = require('../');

// This simple mock is sufficient for our test
class MockObjectId {
  constructor(val = 'deadbeefdeadbeefdeadbeef') {
    this.val = val;
  }
  toHexString() { return this.val; }
}

test('objectid', function (t) {
    t.plan(1);
    var id = new MockObjectId();
    var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3, id: 'id$deadbeefdeadbeefdeadbeef' };
    t.equal(stringify(obj, {pretty: true}), "{a:3,b:[{x:4,y:5,z:6},7],c:8,id:'id$deadbeefdeadbeefdeadbeef'}");
});
