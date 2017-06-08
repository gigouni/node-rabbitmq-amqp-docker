# Examples - Learning/Understanding by doing

Welcome in the _examples_ folder. Here you will be able to find several examples if RabbitMQ implementation.
They are the result of the RabbitMQ tutorial that I invite you to read, 
[It's a really good one](rabbitmq.com/tutorials/tutorial-one-javascript.html).

##  Getting started

Open your terminal and clone the project from Github

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