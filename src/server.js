import create from './createServer.service';

const DEFAULT_PATHS = [{ path: '/ping', response: 'PONG!' }];
const allPaths = (paths) => [...DEFAULT_PATHS, ...paths];

export const start = ({port = 1337, paths = []} = {}) => {
  const server = create(allPaths(paths));

  server.listen(port);

  return server;
};

export const stop = (server) => {
  server.close();
};
