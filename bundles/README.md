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

Configure the constants to access to the containers in the _utils/config.js_ files

Run the __docker-compose.yml__ to docker-ise the bundles into a single 'virtual network'

```shell
$ cd node-amqp/bundles/ && sudo docker-compose up
```

## Additional notes

If you want to use docker without the 'sudo' keyword, use the following commands

```shell
$ # Add the docker group if it doesn't already exist
$ sudo groupadd docker
$
$ # Add the connected user "$USER" to the docker group
$ sudo gpasswd -a $USER docker
$
$ # Activate the changes to groups
$ newgrp docker
```

## Improvements

* Add tests to check if the connection w/ the AMQP client is working and 
if it's necessary to re-run the _AMQP.connect(...)_ call
* Rename some of the _utils_ names to improve the understanding of their utility
* Homogenize the name of vars, files, folders and definitely choose between 
camelCase and snake_case (the may-be-chosen case choice)

To understand why it's the solution, [follow this link](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo).

## References

* [Running and configuring the Docker daemon](https://hub.docker.com/_/node/)
* [Create a Dockerfile in your Node.js app project](https://hub.docker.com/_/rabbitmq/)
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)