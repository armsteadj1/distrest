import http from 'http';
import validate from './validatePath.service';
import loadBody from './body.service';
import { updateBody, updateHeaders, getContentType, getResponse } from './path.service';

const current = (url, paths) => paths.find((p) => p.path === url.split('?')[ 0 ]);

const create = (paths, assert = false) =>
  http.createServer((req, res) => {
    const path = current(req.url, paths);
    if (path) path.headers = updateHeaders(path);
    if (path) path.body = updateBody(path);

    loadBody(req, (body) => {
      if (validate(req, body, path, assert)) {
        const { status = 200 } = path;
        const contentType = getContentType(path);

        res.setHeader('content-type', contentType);
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
