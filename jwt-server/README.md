# Node Token Authentication

This folder follows the content of the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) repo. It will 
helps to implement a JWT authentication while using the RabbitMQ server (token exchange to access to the service).

The next content is the same that the one of the given repo.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@github.com:scotch-io/node-token-authentication`
2. Install dependencies: `npm install`
3. Change SECRET in `config.js`
4. Add your own MongoDB database to `config.js`
5. Start the server: `node server.js`
6. Create sample user by visiting: `http://localhost:8080/setup`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`. 

```
  {
    name: 'Nick Cerminara',
    password: 'password'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.
