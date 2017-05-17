import { expect } from 'chai';
import { start, stop } from "../../src/server";
import { del, post } from "../helpers/api";
import { NOT_FOUND, OK } from "http-status-codes";
import shrug from '../helpers/shrug';
import { TOSS_STATUS_CODE } from "../helpers/execptions";

const method = 'DELETE';

describe(method, () => {
  let expected, path, server;

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/${method}`;
  });

  afterEach(() => {
    stop(server);
  });

  describe('default', () => {
    beforeEach(() => {
      server = start({ paths: [ { path, method, response: expected } ] });
    });

    it('default is a 200', () => {
      return del(path).then(({ body, statusCode }) => {
        expect(statusCode).to.equal(OK);
        expect(body).to.equal(expected);
      });
    });

    it(`only response to ${method}`, () => {
      return post(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });

  describe('body', () => {
    it('200 if match on body', () => {
      const body = 'body is checked';
      server = start({ paths: [ { path, method, response: expected, body } ] });

      return del(path, { body })
        .then(({statusCode}) => expect(statusCode).to.equal(OK));
    });

    it('404 if no match on body', () => {
      const body = 'body is checked';
      server = start({ paths: [ { path, method, response: expected, body } ] });

      return del(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });

  describe('headers', () => {
    it('will 200 all headers match', () => {
      let headers = { authorization: shrug.string(), [shrug.word()]: shrug.word() };
      server = start({ paths: [ { path, method, response: expected, headers: headers } ] });

      return del(path, { headers })
        .then(({ statusCode }) => expect(statusCode).to.equal(OK));
    });

    it('will 404 if a header doesnt match', () => {
      let headers = { authorization: shrug.string() };
      server = start({ paths: [ { path, method, response: expected, headers: headers } ] });

      return del(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });

    it('will 404 if any of the headers dont match', () => {
      let headers = { authorization: shrug.string(), 'accept': shrug.word() };
      let pathHeaders = { ...headers, ...{ [shrug.word()]: shrug.word() } };
      server = start({ paths: [ { path, method, response: expected, headers: pathHeaders } ] });

      return del(path, { headers })
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });
});
