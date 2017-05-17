export const updateHeaders = (path) => {
  const headers = {};
  if (path.bearer) headers.authorization = `Bearer ${path.bearer}`;
  if (path.basic) headers.authorization = `Basic ${path.basic}`;

  return { ...path.headers, ...headers };
};

export const updateBody = (path) => {
  return (isObject(path.body)) ? JSON.stringify(path.body) : path.body;
};

export const getResponse = (path) => {
  return isObject(path.response) ? JSON.stringify(path.response) : path.response;
};

export const getContentType = (path) => {
  return isObject(path.response) ? 'application/json' : (path.contentType) ? path.contentType : 'text/plain';
};

const isObject = obj => typeof(obj) === 'object';
