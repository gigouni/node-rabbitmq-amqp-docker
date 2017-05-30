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

Run the scripts to send and receive the message through the queue

```shell
$ node scripts/send.js
$ node scripts/receive.js

ou

$ node scripts/new_task.js
$ node scripts/worker.js
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