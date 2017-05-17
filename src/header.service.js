const updateHeaders = (path) => {
  const headers = {};
  if(path.bearer) headers.authorization = `Bearer ${path.bearer}`;
  if(path.basic) headers.authorization = `Basic ${path.basic}`;

  return {...path.headers, ...headers};
};

export default updateHeaders;
