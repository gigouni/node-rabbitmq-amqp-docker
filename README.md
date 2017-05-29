# ActiveMQ + Node.js + JWT

This repository is used to assume the way ActiveMQ and Node.js could work 
together, around some AMQP protocol.If it was able to work with JWT 
(JSON Web Token)[https://jwt.io/], it would be better, of course. But later.

## 1. Getting started
### 1.1. Get the project stack

1.1.1. Open your terminal and clone it from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

1.1.2. Get an ActiveMQ docker instance running

```shell
$ docker run -P webcenter/activemq:latest
```

or (for a more complete example)

```shell
$ docker run --name='activemq' -it --rm -e 'ACTIVEMQ_MIN_MEMORY=512' -e 'ACTIVEMQ_MAX_MEMORY=2048' -P webcenter/activemq:latest
```

_Nota Bene:_

* -i: Keep STDIN open even if not attached
* -t: Allocate a pseudo-tty
* -rm: automatically clean up the container and remove the file system when the container exits
* -e: Set any environment variable in the container, 
even overriding __HOME__/__HOSTNAME__/__PATH__/__TERM__, or already defined by the developer 
with a Dockerfile ENV
* -P: Publish all exposed ports to the host interfaces

[Here the Docker run references](https://docs.docker.com/engine/reference/run/)

1.1.3. Check if the instance of ActiveMQ server is running

```shell
$ /path/to/activemq/bin/activemq status
```

## Languages

* [_'AMQP'_ npm's module](https://www.npmjs.com/package/amqp)

