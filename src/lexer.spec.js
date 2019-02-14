const {expect} = require('chai');
const {lex, readString, readNumber} = require('./lexer');


describe('kac lexer', () => {
  
  describe('readString()', () => {

    it('should return empty string token', () => {
      const [token, leftSource] = readString(`""`);
      expect(token).to.be.deep.equal({type: 'string', value: ""}, "empty string token");
      expect(leftSource).to.be.deep.equal("", "empty string left source");
    })

    it('should return non empty string token', () => {
      const [token, leftSource] = readString(`"test"`);
      expect(token).to.be.deep.equal({type: 'string', value: "test"}, "non empty string token");
      expect(leftSource).to.be.deep.equal("", "empty string left source");
    })

    it('should return non empty string token and folowing source', () => {
      const [token, leftSource] = readString(`"test" + "how"`);
      expect(token).to.be.deep.equal({type: 'string', value: "test"}, "non empty string token");
      expect(leftSource).to.be.deep.equal(` + "how"`, "non empty string left source");
    })

    it('should throw an exception on non terminated string', () => {
      expect(() => readString(`"test`)).to.throw();
    })

  });

  describe('readNumber()', () => {
    it('should parse one digit number', () => {
      const [token, leftSource] = readNumber(`4`);
      expect(token).to.be.deep.equal({type: 'number', value: "4"});
      expect(leftSource).to.be.equal("");
    });

    it('should parse float number', () => {
      const [token, leftSource] = readNumber(`41.01245`);
      expect(token).to.be.deep.equal({type: 'number', value: "41.01245"});
      expect(leftSource).to.be.equal("");
    });

  });

  describe('lex()', () => {

    it('should parse string', () => {
      expect(lex(`"hello"`)).to.be.deep.equal([{type: 'string', value: "hello"}]);
    })

    it('should parse multiple strings', () => {
      expect(lex(`"hello" "bye"`)).to.be.deep.equal([{type: 'string', value: "hello"}, {type: 'string', value: "bye"}]);
    })

  })

});
