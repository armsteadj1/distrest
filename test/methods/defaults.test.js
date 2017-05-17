import { expect } from 'chai';
import { start, stop } from "../../src/server";
import { del, get, options, patch, post, put } from "../helpers/api";
import shrug from '../helpers/shrug';
import { OK } from "http-status-codes";

describe('default routes', () => {
  let expected, path, server;

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/defaults`;
    server = start({ paths: [ { path, response: expected } ] });
  });

  afterEach(() => {
    stop(server);
  });

  it('will response to OPTIONS', () => {
    return options(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('will response to DELETE', () => {
    return del(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('will response to PUT', () => {
    return put(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('will response to PATCH', () => {
    return patch(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('will response to POST', () => {
    return post(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('will response to GET', () => {
    return get(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

});
