# RabbitMQ + Node.js + JWT

This repository is used to assume the way RabbitMQ and Node.js could work 
together, around some AMQP protocol.If it was able to work with JWT 
[JSON Web Token](https://jwt.io/), it would be better, of course. But later.

##  Getting started

Open your terminal and clone the project stack from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

Go check the [bundles/README.md](https://github.com/gigouni/node-amqp/blob/docker/bundles/README.md) of the docker branch

## Why RabbitMQ rather than ActiveMQ?

Why not? No seriously, there are some reasons. The first one is the popularity of the RabbitMQ MOM. The most the users, 
the more the potential help for future issues. The second one is the documentation much better w/ RabbitMQ than ActiveMQ. 

"Well, and technically ?"

The POC is here to prove that RabbitMQ could easily, quickly be used as a MOM to handle the sending and receiving 
of messages. It's not so heavy content and benchmarks ([here](http://bit.ly/2qZ20L9) and [here](http://bit.ly/2r59pgh)) 
are OK to tell that RabbitMQ is more efficient w/ light content. The AMQP (_"Advanced Message Queuing Protocol"_) has 
been chosen due to the reliability of its queues and to be an example for most of the RabbitMQ/Node.js interested 
people (MQTT is better for IoT, STOMP for text-based messages and WS should be replaced by STOMP since the Javascript 
correctly handles JSON and text content).

## Improvements

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

* [RabbitMQ tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)
* [JWT.io](https://jwt.io/)