import { expect } from 'chai';
import { start, stop } from "../../src/server";
import { get, post } from "../helpers/api";
import { NOT_FOUND, OK } from "http-status-codes";
import shrug from '../helpers/shrug';
import { TOSS_STATUS_CODE } from "../helpers/execptions";

const method = 'GET';

describe(method, () => {
  let expected, path, server;

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/${method}`;
  });

  afterEach(() => {
    stop(server);
  });

  it('specifying a get will produce a 200', () => {
    server = start({ paths: [ { path, method, response: expected } ] });

    return get(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it('case insensitive get will produce a 200', () => {
    server = start({ paths: [ { path, method: 'GeT', response: expected } ] });

    return get(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it(`only response to ${method}`, () => {
    server = start({ paths: [ { path, method: 'GET', response: expected } ] });

    return post(path)
      .then(() => TOSS_STATUS_CODE('NOT 404'))
      .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
  });

  describe('headers', () => {
    it('will 200 all headers match', () => {
      let headers = { authorization: shrug.string(), [shrug.word()]: shrug.word() };
      server = start({ paths: [ { path, method, response: expected, headers: headers } ] });

      return get(path, { headers })
        .then(({ statusCode }) => expect(statusCode).to.equal(OK));
    });

    it('will 404 if a header doesnt match', () => {
      let headers = { authorization: shrug.string() };
      server = start({ paths: [ { path, method, response: expected, headers: headers } ] });

      return get(path)
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });

    it('will 404 if any of the headers dont match', () => {
      let headers = { authorization: shrug.string(), 'accept': shrug.word() };
      let pathHeaders = { ...headers, ...{ [shrug.word()]: shrug.word() } };
      server = start({ paths: [ { path, method, response: expected, headers: pathHeaders } ] });

      return get(path, { headers })
        .then(() => TOSS_STATUS_CODE('NOT A 404'))
        .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
    });
  });
});
