const validate = (request, body, path) => {
  return path
    && (!path.method || request.method === path.method.toUpperCase())
    && (!path.body || body === path.body);
};

export default validate;
