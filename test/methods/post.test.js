import { expect } from 'chai';
import { start, stop } from "../../src/server";
import { post, put } from "../helpers/api";
import { NOT_FOUND, OK } from "http-status-codes";
import shrug from '../helpers/shrug';
import { TOSS_STATUS_CODE } from "../helpers/execptions";

const method = 'POST';

describe(method, () => {
  let expected, path, server;

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/${method}`;
    server = start({ paths: [ { path, method, response: expected } ] });
  });

  afterEach(() => {
    stop(server);
  });

  it('default is a 200', () => {
    return post(path).then(({ body, statusCode }) => {
      expect(statusCode).to.equal(OK);
      expect(body).to.equal(expected);
    });
  });

  it(`only response to ${method}`, () => {
    return put(path)
      .then(() => TOSS_STATUS_CODE('NOT A 404'))
      .catch(({ response }) => expect(response.statusCode).to.equal(NOT_FOUND));
  });
});
