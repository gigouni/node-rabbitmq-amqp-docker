# Bundles and dockerisation

Welcome in the _bundles_ folder. Here you will be able to find the bundles as they are 
structured to be docker-ise. To run them, execute the following commands.

Have fun!

## Prerequisites

* Docker and docker-compose: [docks.docker.com](https://docs.docker.com/engine/installation/linux/ubuntu/)

##  Getting started

Open your terminal and clone the project from Github

```shell
$ git clone https://github.com/gigouni/node-amqp
```

Get a RabbitMQ instance running (and check status)

```shell
$ sudo rabbitmq-server start
$ sudo rabbitmqctl status
```

Run the scripts to docker-ise the bundles (__here, replace 'gigouni' by your own username__)

```shell
$ # Go to the sender folder and build the image
$ cd node-amqp/bundles/sender
$ sudo docker build -t gigouni/node-amqp-sender .
$
$ # Go to the receiver-mail folder and build the image
$ cd ../receiver_mail && sudo docker build -t gigouni/node-amqp-receiver-mail .
$
$ # Go to the receiver-sms folder and build the image
$ cd ../receiver_sms && sudo docker build -t gigouni/node-amqp-receiver-sms .
```

Check if the images are OK

```shell
$ sudo docker images
```

If it's returning something like

```shell
REPOSITORY                        TAG                 IMAGE ID            CREATED              SIZE
gigouni/node-amqp-receiver-sms    latest              bctg24ff3c0b        4 seconds ago        66.11 MB
gigouni/node-amqp-receiver-mail   latest              c2f1re0a932f        22 seconds ago       66.11 MB
gigouni/node-amqp-sender          latest              3d995rcca48b        2 minutes ago        66.11 MB
```

It means you've succeed. Congrats! If you need to remove a single image (_if you changed the content of an 
image, it's not necessary to delete it before rebuild it_), you can use

```shell
$ sudo docker images
$ sudo docker rmi -f <image-id>
```

## Running the images

Let's run the receiver-sms image (cf _Nota Bene_ below)

```shell
$ sudo docker run gigouni/node-amqp-receiver-sms
```

_Nota Bene:_

* -d: Run the container in detached mode
* -i: Keep STDIN open even if not attached
* -t: Allocate a pseudo-tty
* -rm: automatically clean up the container and remove the file system when the container exits
* -e: Set any environment variable in the container, even overriding HOME/HOSTNAME/PATH/TERM, 
    or already defined by the developer with a Dockerfile ENV
* -P: Publish all exposed ports to the host interfaces

## References

* [Create a Dockerfile in your Node.js app project](https://hub.docker.com/_/node/)
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)