import r from "request-promise";
import {TEST_API_HOST} from "./consts";

export const get = (uri, {host = TEST_API_HOST} = {}) => r({method: 'GET', uri: `${host}${uri}`, resolveWithFullResponse: true});
