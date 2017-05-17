export const updateHeaders = (path) => {
  const headers = {};
  if (path.bearer) headers.authorization = `Bearer ${path.bearer}`;
  if (path.basic) headers.authorization = `Basic ${path.basic}`;

  return { ...path.headers, ...headers };
};

export const updateBody = (path) =>
  (isObject(path.body)) ? JSON.stringify(path.body) : path.body;

export const getResponse = (path) =>
  isObject(path.response) ? JSON.stringify(path.response) : path.response;

export const getContentType = (path) =>
  ({ 'content-type': contentType(path) ? contentType(path) : (isObject(path.response)) ? 'application/json' : 'text/plain' });

export const getResponseHeaders = (path) =>
  isObject(path.responseOptions) ? (path.responseOptions.headers) ? { ...path.responseOptions.headers, ...getContentType(path) } : getContentType(path) : getContentType(path);

const isObject = obj => typeof(obj) === 'object';
const contentType = (path) => {
  try {
    return path.responseOptions.headers[ 'content-type' ]
  } catch (e) {
  }
}
