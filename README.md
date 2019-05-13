# Employee Directory

## Getting started
### Install dependencies
```
yarn
```
For the client
```
cd client && yarn
```

#### For Development
Setup the database
```
yarn db:setup
```

Start the server
```
yarn server
```

Start the client

```
yarn client
```

#### For Production

Ensure a PGSQL database name `employee_directory` exists
```
 // on a Mac
createdb employee_directory
```

Setup the database
```
NODE_ENV=production yarn db:setup
```

Build the client
```
yarn build
```
Start the server
```
yarn start
```
Visit http://localhost:3001

## Architecture
The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [React Router](https://reacttraining.com/react-router/) for routing and [Redux](https://redux.js.org) for state management.

The server uses [Express](http://expressjs.com/) and [knex](https://knexjs.org/) to interact with the Postgres or SQLite database.

### Features
- Pagination
- Ability to filter employees by department, title, or location. 
- Search for employees on the page by name.


