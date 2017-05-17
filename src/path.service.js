export const updateHeaders = (path) => {
  const headers = {};
  if(path.bearer) headers.authorization = `Bearer ${path.bearer}`;
  if(path.basic) headers.authorization = `Basic ${path.basic}`;

  return {...path.headers, ...headers};
};

export const updateBody = (path) => {
  return (typeof(path.body) === 'object') ? JSON.stringify(path.body) : path.body;
};
