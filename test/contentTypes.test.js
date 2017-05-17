import { expect } from 'chai';
import { start, stop } from '../src/server';
import { post } from './helpers/api';
import shrug from './helpers/shrug';

describe('content types', () => {
  let expected, path, server, method = 'POST';

  beforeEach(() => {
    expected = { [shrug.word()]: shrug.word() };
    path = `/${shrug.word()}/auth`;
  });

  afterEach(() => {
    stop(server);
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
  });

  it('will return path content-type', () => {
    let contentType = 'application/xml';
    server = start({ paths: [ { path, method, contentType: contentType } ] });

    return post(path)
      .then(({ headers }) => {
        expect(headers[ 'content-type' ]).to.equal(contentType);
      });
  });
});
