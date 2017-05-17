export const TOSS_STATUS_CODE = (code) => {
  throw {response: {statusCode: code}}
};
