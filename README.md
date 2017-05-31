# RabbitMQ + Node.js + JWT

This repository is used to assume the way RabbitMQ and Node.js could work 
together, around some AMQP protocol.If it was able to work with JWT 
[JSON Web Token](https://jwt.io/), it would be better, of course. But later.

##  Getting started

Open your terminal and clone the project stack from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

Get a RabbitMQ instance running (and check status)

```shell
$ rabbitmq-server start
$ rabbitmqctl status
```

Run the scripts to send and receive the message through the queue (for params, check scripts themselves)

```shell
$ node examples/scripts/send.js
$ node examples/scripts/receive.js

or

$ node examples/scripts/new_task.js
$ node examples/scripts/worker.js

or

$ node examples/scripts/emit_log.js
$ node examples/scripts/receive_log.js

or

$ node examples/scripts/emit_log_direct.js
$ node examples/scripts/receive_log_direct.js

or

$ node examples/scripts/emit_log_topic.js
$ node examples/scripts/receive_log_topic.js

or

$ node examples/scripts/rpc_server.js
$ node examples/scripts/rpc_client.js
```

## To do list

* ~~Handle the ECONNREFUSED issue~~
* ~~Finish the part one of the tutorial ("Hello World!")~~
* ~~Finish the part two of the tutorial (Work queues)~~
* ~~Try to create senders (publishers)~~
* ~~Try to create receivers (consumers)~~
* ~~Try to create a queue~~
* ~~Finish the part three of the tutorial (Publish/Subscribe)~~
* ~~Finish the part four of the tutorial (Routing)~~
* ~~Finish the part five of the tutorial (Topics)~~
* ~~Finish the part six of the tutorial (RPC)~~
* Implement an example of JWT authentication Node.js side plus session ID
* Implement an authentication service RabbitMQ side
* Improve the stack with a better architecture and documentation (maybe)

## Running the tests

_Not implemented yet_

## Deployment

Docker could be a part of the solution. _Could be_ .. Let's see it later

## Built With

* [Node.js](https://nodejs.org/en/) - The JS interpreter
* [RabbitMQ](https://rabbitmq.com/) - The MOM (message broker)
* [Express JWT](https://www.npmjs.com/package/express-jwt) - Used to secure the access to the back-end

## Contributing

No contributions necessary.

## Versioning

* v2 _In progress_
    * Move the previous scripts to a examples/ folder
    * Create an empty Node.js server with two routes (one to check if the server is running, the other one to check the JWT protection)
    * Add _express-jwt_ module to use JWT access control
    * Improve the README.md

* v1
    * Create an util to mutualise constants values
    * Follow the six steps of the RabbitMQ tutorial
    * Move the created scripts to a script/ folder
    * Write a README.md and add comments to a better understanding of the scripts

## Authors

* **Nicolas GIGOU** - *Initial work* - [Gigouni](https://github.com/gigouni)

_No other contributors_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Implement a Node.js server
* Follow ES6 conventions
* Assume the role and the features of a MOM (_"Message-Oriented Middleware"_)
* Bind a Node.js server with a MOM like RabbitMQ
* Control access through JWT

## References

* [Docker run references](https://docs.docker.com/engine/reference/run/)
* [Source of this Docker image](https://hub.docker.com/r/rabbitmq/)
* [RabbitMQ tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)