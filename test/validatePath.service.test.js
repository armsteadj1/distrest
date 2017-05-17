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
});
