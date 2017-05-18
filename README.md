# distrest

Stop stressing about mocking out those pesky external APIs and let `distRest` do all the worrying. This library was created to keep all the management of your external stubs right where they should be, in your tests. It will spin up and spin down a server on the fly within your tests and do it FAST. No need to worry about external dependency management and waiting for those stub servers to start up, these start up with your tests and stop with your tests.

Getting started is as easy as installing the module and calling `start()`.

What are you waiting for? A worry free test is waiting for you.


## Packages

### npm

```shell
npm install distrest
```

## Usage

```
    import { start, stop } from 'distRest';
    import request from 'request'; //npm i request

	let server = start();

    request('http://localhost:1337/ping', function (error, response, body) {
    	console.log(body); // PONG!
    });

    request('http://localhost:1337/notPing', function (error, response, body) {
    	console.log(body); // 404 - These are not the paths you are looking for.
        stop(server);
    });
```


```
    import distrest from 'distRest';
    import request from 'request'; //npm i request

	let server = distrest.start();

    request('http://localhost:1337/ping', function (error, response, body) {
    	console.log(body); // PONG!
    });

    request('http://localhost:1337/notPing', function (error, response, body) {
    	console.log(body); // 404 - These are not the paths you are looking for.
        distrest.stop(server);
    });
```

### Methods

* `start` - Takes options object and starts the server up.
	* returns a `server object`.
* `stop` - Takes a `server object` and will stop it.

### Options

* `assert` - A boolean to specify if the server should do an assert when an endpoint is called but an expectation is missed, making it easier to understand why your response isn't getting to your application. Defaults to false.
* `basic` - Specifying a basic authentication and will require the requester to have `Authentication="Basic {basic string}"`.
* `bearer` - Specifying a bearer authentication and will require the requester to have `Authentication="Baerer {bearer string}"`.
* `port` - Specifying which port the server should start on. Defaults to 1337.
* `paths` - An array of paths defining how your stub should respond to calls
	* `body` - (String or Object) of the request body and will require the requester to have this as their request's `body`.
	* `headers` - Object of headers to be requred in the request
		* `{'accept-charset': 'utf-8', accept: 'text/plain'}`
	* `path` - String specifying the path to stub. (e.g. `/ping`)
	* `response` - (String or Object) which will be responeded back.
		* If the response is an Object, `distRest` will automatically set the Content-Type to `application/json`.
    * `responseOptions` - Object of options
    	* `headers` Object of headers to be returned in the response
			* `{'content-type': 'application/json', 'cache-control': 'no-store'}`
    * `status` - HTTP Status code for the response. Defaults to 200.




## Contributors

```
James Armstead
Ajdin Hedzic - https://github.com/ajdinhedzic
Todd Eschweiler
```

### Contribute!

Be a part of this project! You can run the test using the following.

1. Install dependencies from package.json by running `npm install`
2. Run the test via `npm test`
3. Contribute!

This project is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License)

Proudly written in Des Moines, Iowa.
