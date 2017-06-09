# RabbitMQ + Node.js + JWT

This repository is used to assume the way [RabbitMQ](https://www.rabbitmq.com/) and 
[Node.js](https://nodejs.org/en/) could work together, around some AMQP protocol, 
without forgetting the JWT ([JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)) 
authentication.

Hey, wanna know more? It's running with [Docker](https://www.docker.com/)!

##  Getting started

Open your terminal and clone the project stack from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

Go check the [bundles/README.md](https://github.com/gigouni/node-amqp/blob/master/bundles/README.md)

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

* Implement an example of session ID authentication
* Improve the stack with a better architecture and documentation (maybe)

## Running the tests

_Not implemented yet. Let's see it later_

## Deployment

__Docker__ is part of the solution. [Check this](https://github.com/gigouni/node-amqp/blob/master/bundles/).

## Built With

* [Node.js](https://nodejs.org/en/) - The JS interpreter
* [RabbitMQ](https://rabbitmq.com/) - The MOM (message broker)
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) - Used to secure the access to the back-end
* [Docker](https://www.docker.com/) - The application container

## Contributing

No contributions necessary.

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
* Dockerize the application w/ Dockerfile or docker-compose.yml

## References

* [RabbitMQ tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)
* [Running and configuring the Docker daemon](https://hub.docker.com/_/node/)
* [Create a Dockerfile in your Node.js app project](https://hub.docker.com/_/rabbitmq/)
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)