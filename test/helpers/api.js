import r from "request-promise";
import { TEST_API_HOST } from "./consts";

export const get = (uri, { host = TEST_API_HOST, headers } = {}) => r({
  method: 'GET',
  headers,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const post = (uri, { host = TEST_API_HOST, body, headers, json } = {}) => r({
  method: 'POST',
  body,
  headers,
  json,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const put = (uri, { host = TEST_API_HOST, body, headers, json } = {}) => r({
  method: 'PUT',
  body,
  json,
  headers,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const del = (uri, { host = TEST_API_HOST, body, headers, json } = {}) => r({
  method: 'DELETE',
  body,
  json,
  headers,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const options = (uri, { host = TEST_API_HOST, headers } = {}) => r({
  method: 'OPTIONS',
  headers,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
export const patch = (uri, { host = TEST_API_HOST, body, headers, json } = {}) => r({
  method: 'PATCH',
  body,
  json,
  headers,
  uri: `${host}${uri}`,
  resolveWithFullResponse: true
});
