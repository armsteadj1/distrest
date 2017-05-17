import {expect} from 'chai';

const checkBody = (pathBody, body, assert) => {
  let pass = (!pathBody || body === pathBody);

  return (assert && pathBody && !pass) ? expect(body).to.equal(pathBody) : pass;
};

const validate = (request, body, path, assert = false) => {
  return path
    && (!path.method || request.method === path.method.toUpperCase())
    && checkBody(path.body, body, assert);
};

export default validate;
