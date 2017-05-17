import {expect} from 'chai';
import {start, stop} from "../src/server";
import {get} from "./helpers/api";
import {NOT_FOUND} from "http-status-codes";

describe('path not found', () => {
  let server;

  beforeEach(() => {
    server = start();
  });

  afterEach(() => {
    stop(server);
  });

  describe('defaults', () => {
    it('will return a 404', () => {
      return get('/not/found')
        .then(() => expect(false).to.be.true)
        .catch(({response}) => expect(response.statusCode).to.equal(NOT_FOUND));
    });

    it('will return body', () => {
      return get('/not/found')
        .then(() => expect(false).to.be.true)
        .catch(({response}) => expect(response.body).to.equal('These are not the paths you are looking for.'));
    });
  });
});
