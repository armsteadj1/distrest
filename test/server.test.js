import { expect } from 'chai';
import distrest, { start, stop } from "../src/server";
import { get } from "./helpers/api";
import { OK } from "http-status-codes";

describe('server', () => {
  describe('port', () => {
    let server;

    afterEach(() => stop(server));

    it('will start server on correct port', () => {
      server = start({ port: 7331 });

      return get('/ping', { host: 'http://localhost:7331' }).then(({ statusCode }) => {
        expect(statusCode).to.equal(OK);
      });
    });
  });

  describe('export all', () => {
    let server;

    afterEach(() => distrest.stop(server));

    it('will start server on correct port', () => {
      server = distrest.start({ port: 7331 });

      return get('/ping', { host: 'http://localhost:7331' }).then(({ statusCode }) => {
        expect(statusCode).to.equal(OK);
      });
    });
  });

  describe('defaults', () => {
    let server;

    it('will start the server with defaults', () => {
      server = start();

      return get('/ping').then(({ statusCode }) => {
        expect(statusCode).to.equal(OK);

        stop(server);

        return get('/ping')
          .then(({ body }) => expect(true).to.be.false)
          .catch(({ cause }) => expect(cause.code).to.equal('ECONNREFUSED'));
      });
    });
  });

  describe('assert was called', () => {
    let server;

    afterEach(() => stop(server));

    it('will increase call count', () => {
      server = start();

      return get('/ping').then(() => {
        expect(server.paths[0].calls.length).to.equal(1);

        return get('/ping').then(() => {
          expect(server.paths[0].calls.length).to.equal(2);
        });
      });
    });

    it('will add the request for each call', () => {
      server = start();

      return get('/ping').then(() => {
        expect(server.paths[0].calls[0].constructor.name).to.equal("IncomingMessage");
      });
    });
  });
});
