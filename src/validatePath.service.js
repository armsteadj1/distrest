const validate = (request, path) => {
  return path &&
    (!path.method || request.method === path.method.toUpperCase());
};

export default validate;
