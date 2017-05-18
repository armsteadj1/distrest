import create from './createServer.service';

const DEFAULT_PATHS = [ { path: '/ping', response: 'PONG!' } ];
const allPaths = (paths) => [ ...DEFAULT_PATHS, ...paths ].map(p => {
  p.calls = [];
  return p;
});

export const start = ({ assert = false, port = 1337, paths = [] } = {}) => {
  let pathsWithDefault = allPaths(paths);
  const server = create(pathsWithDefault, assert);

  server.listen(port);

  return { server, paths: pathsWithDefault };
};

export const stop = ({ server }) => {
  server.close();
};

export default { stop, start };
