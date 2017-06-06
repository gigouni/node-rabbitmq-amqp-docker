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
$ sudo rabbitmq-server start
$ sudo rabbitmqctl status
```

Run the scripts to send and receive the message through the queue

```shell
$ node scripts/send_server.js
$ node scripts/receive_sms_server.js
$ node scripts/receive_mail_server.js
```

## TODO list

* Implement an example of JWT authentication Node.js side plus session ID
* Implement an authentication service RabbitMQ side
* Improve the stack with a better architecture and documentation (maybe)

## References

* [RabbitMQ tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)