import { expect } from 'chai';
import { start, stop } from '../src/server';
import { post } from './helpers/api';
import { NOT_FOUND, OK } from 'http-status-codes';
import shrug from './helpers/shrug';
import { TOSS_STATUS_CODE } from "./helpers/execptions";

describe('authentication', () => {
  let expected, path, server, method = 'POST';

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/auth`;
  });

  afterEach(() => {
    stop(server);
  });

  describe('bearer', () => {
    it('will check token correctly', () => {
      let headers = { authorization: `Bearer ${expected}` };
      server = start({ paths: [ { path, method, response: expected, bearer: expected } ] });

      return post(path, { headers })
        .then(({ statusCode }) => expect(statusCode).to.equal(OK));
    });

    it('will 404 if authentication not matched', () => {
      server = start({ paths: [ { path, method, response: expected, bearer: expected } ] });

      return post(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });

  describe('basic', () => {
    it('will check token correctly', () => {
      let headers = { authorization: `Basic ${expected}` };
      server = start({ paths: [ { path, method, response: expected, basic: expected } ] });

      return post(path, { headers })
        .then(({ statusCode }) => expect(statusCode).to.equal(OK));
    });

    it('will 404 if authentication not matched', () => {
      server = start({ paths: [ { path, method, response: expected, basic: expected } ] });

      return post(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });
});
