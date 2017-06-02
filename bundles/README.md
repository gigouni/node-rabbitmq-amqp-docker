# RabbitMQ + Node.js + JWT

Welcome in the _bundles_ folder. Here you will be able to find the bundles as they are 
structured to be docker-ise. To run them, execute the following commands.

Have fun!

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

Run the scripts to docker-ise the bundles

```shell
$ cd node-amqp/bundles/sender && docker build -t <your-username>/node-amqp-sender .
$ cd ../receiver_mail && docker build -t <your-username>/node-amqp-receiver-mail .
$ cd ../receiver_sms && docker build -t <your-username>/node-amqp-receiver-sms .

or, if you prefer easy stuff

$ npm run build-docker-sender
$ npm run build-docker-receiver-mail
$ npm run build-docker-receiver-sms
```

Check if the images are OK

```shell
$ sudo docker images
```

If it's returning something like

```shell
REPOSITORY                        TAG                 IMAGE ID            CREATED              SIZE
<your-username>/node-amqp-receiver-sms    latest              bccb24ff3c0b        4 seconds ago        66.11 MB
<your-username>/node-amqp-receiver-mail   latest              c2f1df0a932f        22 seconds ago       66.11 MB
<your-username>/node-amqp-sender          latest              3d99f3cca48b        2 minutes ago        66.11 MB
```

It means you've succeed. Congrats!