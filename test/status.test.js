import { expect } from 'chai';
import { start, stop } from '../src/server';
import { post } from './helpers/api';
import { ACCEPTED, SERVICE_UNAVAILABLE } from 'http-status-codes';
import shrug from './helpers/shrug';
import { TOSS_STATUS_CODE } from "./helpers/execptions";

describe('status', () => {
  let expected, path, server, method = 'POST';

  beforeEach(() => {
    expected = shrug.word();
    path = `/${expected}/auth`;
  });

  afterEach(() => {
    stop(server);
  });


  it('will return the correct authentication', () => {
    server = start({ paths: [ { path, method, status: ACCEPTED } ] });

    return post(path)
      .then(({ statusCode }) => expect(statusCode).to.equal(ACCEPTED));
  });

  it('will 404 if authentication not matched', () => {
    server = start({ paths: [ { path, method, status: SERVICE_UNAVAILABLE } ] });

    return post(path)
      .then(() => TOSS_STATUS_CODE('NOT A SERVICE_UNAVAILABLE'))
      .catch(({ response }) => expect(response.statusCode).to.equal(SERVICE_UNAVAILABLE));
  });
});
