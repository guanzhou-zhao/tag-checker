function tagChecker(str) {

  var tagStack = [];
  // retrieve all the tags from paragraph
 	var tags = str.match(/<[A-Z]>|<\/[A-Z]>/g);

  for (var i=0; i<tags.length; i++) {
    var thisTag = tags[i];
    if (isOpenTag(thisTag)) {
      tagStack.push(thisTag);
    } else {
      // Close Tag
      // There is unmatched open tags in tagStack
      if (tagStack.length > 0) {
        var startTag = tagStack.pop();
        var expectedCloseTag = `</${startTag.charAt(1)}>`
        if (expectedCloseTag !== thisTag) {
          return `Expected ${expectedCloseTag} found ${thisTag}`;
        }

      // There is no open tag in tagStack
      } else {
        return `Expected # found ${thisTag}`;
      }
    }
  }

  // There is unmatched open tags left in tagStack
  if (tagStack.length > 0) {
    var lastOpenTag = tagStack[tagStack.length-1];
    var expectedCloseTag = `</${lastOpenTag.charAt(1)}>`
    return `Expected ${expectedCloseTag} found #`
  }

	return 'Correctly tagged paragraph';
};

function isOpenTag(str) {
  return !(str.includes('/'));
}

module.exports = tagChecker;
