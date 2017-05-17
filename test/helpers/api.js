import r from "request-promise";
import { TEST_API_HOST } from "./consts";

export const get = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'GET',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const post = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'POST',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const put = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'PUT',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const del = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'DELETE',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const options = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'OPTIONS',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const patch = (uri, { host = TEST_API_HOST } = {}) => r({
  method: 'PATCH',
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
