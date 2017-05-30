# RabbitMQ + Node.js + JWT

This repository is used to assume the way RabbitMQ and Node.js could work 
together, around some AMQP protocol.If it was able to work with JWT 
[JSON Web Token](https://jwt.io/), it would be better, of course. But later.

## 1. Getting started

Open your terminal and clone the project stack from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

Get an RabbitMQ docker instance running

```shell
$ docker run --name='rabbitmq-node' -it --rm -e -P rabbitmq:latest
```

_Nota Bene:_

* -i: Keep STDIN open even if not attached
* -t: Allocate a pseudo-tty
* -rm: automatically clean up the container and remove the file system when the container exits
* -e: Set any environment variable in the container, 
even overriding __HOME__/__HOSTNAME__/__PATH__/__TERM__, or already defined by the developer 
with a Dockerfile ENV
* -P: Publish all exposed ports to the host interfaces

Check if the instance of RabbitMQ server is running

```shell
$ /path/to/rabbitmq/bin/rabbitmq status
```

## TODO list

* Handle the ECONNREFUSED issue
* Try to create senders (publishers)
* Try to create receivers (consumers)
* Try to create a queue
* Implement the JWT authentication
* Improve the stack with a better architecture and documentation (maybe)

## References

* [Docker run references](https://docs.docker.com/engine/reference/run/)
* [Source of this Docker image](https://hub.docker.com/r/rabbitmq/)