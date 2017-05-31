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

or

$ node scripts/new_task.js
$ node scripts/worker.js

or

$ node scripts/emit_log.js
$ node scripts/receive_log.js

or

$ node scripts/emit_log_direct.js
$ node scripts/receive_log_direct.js

or

$ node scripts/emit_log_topic.js
$ node scripts/receive_log_topic.js

or

$ node scripts/rpc_server.js
$ node scripts/rpc_client.js
```

## TODO list

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
* Implement an example of JWT authentication
* Improve the stack with a better architecture and documentation (maybe)

## References

* [Docker run references](https://docs.docker.com/engine/reference/run/)
* [Source of this Docker image](https://hub.docker.com/r/rabbitmq/)