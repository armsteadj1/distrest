import { expect } from 'chai';

const checkHeaders = (pathHeaders = {}, headers, assert) => {
  return Object.keys(pathHeaders).every(key => {
      let pass = pathHeaders[ key ] === headers[ key ];
      return !pass && assert
        ? expect(headers[ key ]).to.equal(pathHeaders[ key ], `headers.${key} to equal '${pathHeaders[ key ]}'`)
        : pass;
    }
  );
};

const checkBody = (pathBody, body, assert) => {
  let pass = (!pathBody || body === pathBody);

  return (assert && pathBody && !pass) ? expect(body).to.equal(pathBody) : pass;
};

const validate = (request, body, path, assert = false) => {
  return path
    && (!path.method || request.method === path.method.toUpperCase())
    && checkBody(path.body, body, assert)
    && checkHeaders(path.headers, request.headers, assert);
};

export default validate;
