import { expect } from 'chai';
import { start, stop } from '../src/server';
import { post } from './helpers/api';
import shrug from './helpers/shrug';

describe('response headers', () => {
  let expected, path, server, method = 'POST';

  beforeEach(() => {
    expected = { [shrug.word()]: shrug.word(), [shrug.word()]: shrug.word() };
    path = `/${shrug.word()}/auth`;
  });

  afterEach(() => {
    stop(server);
  });

  it('will return the correct headers', () => {
    server = start({ paths: [ { path, method, responseOptions: { headers: expected } } ] });

    return post(path)
      .then(({ headers }) => {
        Object.keys(expected).forEach((key) => expect(headers[ key ]).to.equal(expected[ key ]))
      });
  });

  describe('json', () => {
    it('will return json as response', () => {
      server = start({ paths: [ { path, method, response: expected } ] });

      return post(path)
        .then(({ body, headers }) => {
          expect(headers[ 'content-type' ]).to.equal('application/json');
          expect(JSON.parse(body)).to.deep.equal(expected)
        });
    });

    it('will override default json content type if defined', () => {
      server = start({
        paths: [ {
          path,
          method,
          response: expected,
          responseOptions: { headers: {'content-type': 'application/json+hal'} }
        } ]
      });

      return post(path)
        .then(({ body, headers }) => {
          expect(headers[ 'content-type' ]).to.equal('application/json+hal');
          expect(JSON.parse(body)).to.deep.equal(expected)
        });
    });
  });
});
