import http from 'http';

const current = (url, paths) => paths.find((p) => p.path === url.split('?')[0]);

const create = (paths) =>
  http.createServer((req, res) => {
    const path = current(req.url, paths);

    if(path)
      res.end(path.response);
    else
    {
      res.writeHead(404);
      res.end('These are not the paths you are looking for.');
    }
  });

export default create;
