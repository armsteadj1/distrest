const loadBody = (request, cb) => {
    const body = [];

    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      cb(Buffer.concat(body).toString());
    });
};

export default loadBody;
