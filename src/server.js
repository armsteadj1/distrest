import create from './createServer.service';

const DEFAULT_PATHS = [{ path: '/ping', response: 'PONG!' }];
const allPaths = (paths) => [...DEFAULT_PATHS, ...paths];

export const start = ({assert = false, port = 1337, paths = []} = {}) => {
  const server = create(allPaths(paths), assert);

  server.listen(port);

  return server;
};

export const stop = (server) => {
  server.close();
};

export default {stop, start};
