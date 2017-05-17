import { expect } from 'chai';
import validate from '../src/validatePath.service';

describe('validatePath', () => {
  describe('body', () => {
    it('will assert if assert=true', () => {
      const path = {body: 'not match'};

      try {
        validate({}, 'body', path, true)
      }catch(e) {
        expect(e.message).to.equal('expected \'body\' to equal \'not match\'');
        return;
      }

      expect('Expected assert to have happened').to.be.true;
    });
  });

  describe('headers', () => {
    it('will assert if assert=true', () => {
      const path = {headers: {value: 'not match'}};

      try {
        validate({headers: {}}, '', path, true)
      }catch(e) {
        expect(e.message).to.equal('headers.value to equal \'not match\': expected undefined to equal \'not match\'');
        return;
      }

      expect('Expected assert to have happened').to.be.true;
    });
  });
});
