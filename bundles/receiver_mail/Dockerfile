#  -----------------------------------------
# |              DOCKERFILE                 |
# |             Nicolas GIGOU               |
# |                                         |
# |         receiver_mail_bundle            |
#  -----------------------------------------

# Prepared thanks to: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Define from what image we want to bulid from
# node:* to get the node commands
# *:alpine for the lightness
FROM node:alpine

# We create a directory to hold the application code inside the image
# This will be the working directory for your application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# This image comes with Node.js and NPM already installed so the next thing we need to do is
# To install your app dependencies using the npm binary
COPY package.json /usr/src/app/
RUN npm install

# To bundle your app's source code inside the Docker image
COPY . /usr/src/app

# You'll use the EXPOSE instruction to have it mapped by the docker daemon
# Here for development only, you should just expose your real ports
EXPOSE 5671-5672

# Limit the number of processus for the container to avoid system overflow
# CMD [ "ulimit", "-u", "1" ]
CMD [ "npm", "start" ]