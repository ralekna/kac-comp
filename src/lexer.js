function lex(source) {
  let char = source[0];

  switch(true) {
    case char === undefined:
      return [];
    case " \n\t".includes(char):
      return lex(tail(source));
    case char === '\"':
      return readAndContinue(readString, source);
    case char.match(/\d/):
      return readAndContinue(readNumber, source);
    default:
      throw new Error(`Unexpected char ${char}`);
  }
}

function readAndContinue(fn, source) {
  let [token, leftSource] = fn(source);
  return [token].concat(lex(leftSource));
}

function tail(source) {
  return source.slice(1);
}

function readString(source) {
  let leftChars = tail(source);
  let end = leftChars.indexOf('\"');
  if (end === -1) {
    throw new Error('Expecting \" at the end of the string');
  }

  return [{type: 'string', value: leftChars.slice(0, end)}, leftChars.slice(end + 1)];
}

function readNumber(source) {
  let number = source.match(/^\d+(?:\.\d+)?/)[0];
  return [{type: 'number', value: number}, source.slice(number.length)];
}

module.exports = {
  lex,
  readString,
  readNumber
}
