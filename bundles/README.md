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

## Clustering

The clustering is necessary when there is a big (estimated) increase in loads (increase in the 
number of users by example) and it's necessary to increase the number of available machines 
to meet the needs of the clients and services in a proportionate way.

Considering you're checking your RabbitMQ server flow using the RabbitMQ Management plugin 
(enabled in this stack, check the _bundles/docker-compose.yml_), you can note some unusual 
high amounts of connections. To continue to provide an efficient service, you'll need to 
clusterise your application. There are several way to form the cluster

* Manually with rabbitmqctl (e.g. in development environments)
* Declaratively by listing cluster nodes in [config file](https://www.rabbitmq.com/configure.html)
* Declaratively with [rabbitmq-autocluster](https://github.com/aweber/rabbitmq-autocluster/) (a plugin)

To read a complete guide about the RabbitMQ clustering, 
[check this](https://www.rabbitmq.com/clustering.html) and [this](https://www.rabbitmq.com/ha.html)

### Sum up

The nodes are communicating through the "cluster network" thanks to the same secret phrase 
(Erlang cookie). To set up the cluster, considering using the first way of clustering 
the application, just run the rabbitmq-server commands from the shell (examples for the link)
 
```shell
rabbit1$ rabbitmq-server -detached
rabbit2$ rabbitmq-server -detached
rabbit3$ rabbitmq-server -detached
```

Join the nodes

```shell
rabbit2$ rabbitmqctl stop_app
  Stopping node rabbit@rabbit2 ...done.
  
rabbit2$ rabbitmqctl join_cluster rabbit@rabbit1
  Clustering node rabbit@rabbit2 with [rabbit@rabbit1] ...done.
  
rabbit2$ rabbitmqctl start_app
  Starting node rabbit@rabbit2 ...done.
```

Then, check the cluster status

```shell
$ rabbitmqctl cluster_status
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

To understand why it's the solution, [follow this link](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo).

## Improvements

* Add tests to check if the connection w/ the AMQP client is working and 
if it's necessary to re-run the _AMQP.connect(...)_ call
* Rename some of the _utils_ names to improve the understanding of their utility
* Homogenize the name of vars, files, folders and definitely choose between 
camelCase and snake_case (the may-be-chosen case choice)

## References

* [Running and configuring the Docker daemon](https://hub.docker.com/_/node/)
* [Create a Dockerfile in your Node.js app project](https://hub.docker.com/_/rabbitmq/)
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)