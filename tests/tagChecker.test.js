var test = require('ava');
var tagChecker = require('../tagChecker.js');

var testData = [
  {
    input: 'The following text<C><B>is centred and in boldface</B></C>',
    expectedResult: 'Correctly tagged paragraph',
    title: 'Correctly tagged 1'
  },
  {
    input: '<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence',
    expectedResult: 'Correctly tagged paragraph',
    title: 'Correctly tagged 2'
  },
  {
    input: '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>',
    expectedResult: 'Expected </C> found </B>',
    title: 'wrongly nested'
  },
  {
    input: '<B>This should be in boldface, but there is an extra closing tag</B></C>',
    expectedResult: 'Expected # found </C>',
    title: 'extra closing tag'
  },
  {
    input: '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
    expectedResult: 'Expected </B> found #',
    title: 'missing closing tag'
  }
];

for (var i=0; i<testData.length; i++) {
  var testEntry = testData[i];

  // run test
  test(testEntry.title, t=> {
    var result = tagChecker(testEntry.input);
    t.is(result, testEntry.expectedResult);
  });
}
