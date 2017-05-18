import http from 'http';
import validate from './validatePath.service';
import loadBody from './body.service';
import { updateBody, updateHeaders, getResponse, getResponseHeaders, increaseCallCount } from './path.service';

const current = (url, paths) => paths.find((p) => p.path === url.split('?')[ 0 ]);

const create = (paths, assert = false) =>
  http.createServer((req, res) => {
    const path = current(req.url, paths);
    if (path) path.headers = updateHeaders(path);
    if (path) path.body = updateBody(path);

    loadBody(req, (body) => {
      if (validate(req, body, path, assert)) {
        path.calls.push(req);
        const { status = 200 } = path;
        const headers = getResponseHeaders(path);

        Object.keys(headers).forEach((key) => res.setHeader(key, headers[ key ]));
        res.writeHead(status);
        res.end(getResponse(path));
      }
      else {
        res.writeHead(404);
        res.end('These are not the paths you are looking for.');
      }
    });
  });

export default create;
