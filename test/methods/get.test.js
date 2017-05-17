import {expect} from 'chai';
import {start, stop} from "../../src/server";
import {get} from "../helpers/api";
import {OK} from "http-status-codes";
import shrug from '../helpers/shrug';

describe('get', () => {
  let expected;

  beforeEach(() => {
    expected = shrug.string();
  });

  it('default method is a 200 GET', () => {
    const server = start({paths: [{path: '/get', response: expected}]});

    return get('/get').then(({body, statusCode}) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
      stop(server);
    });
  });
});
