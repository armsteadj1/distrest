import { expect } from 'chai';
import { start, stop } from "../src/server";
import { get } from "./helpers/api";
import { OK } from "http-status-codes";

describe('server', () => {
  describe('port', () => {
    it('will start server on correct port', () => {
      const server = start({ port: 7331 });

      return get('/ping', { host: 'http://localhost:7331' }).then(({ statusCode }) => {
        expect(statusCode).to.equal(OK);
        stop(server);
      });
    });
  });

  describe('defaults', () => {
    it('will start the server with defaults', () => {
      const server = start();

      return get('/ping').then(({ statusCode }) => {
        expect(statusCode).to.equal(OK);

        stop(server);

        return get('/ping')
          .then(({ body }) => expect(true).to.be.false)
          .catch(({ cause }) => expect(cause.code).to.equal('ECONNREFUSED'));
      });
    });
  });
});
