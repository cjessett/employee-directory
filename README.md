# Employee Directory

## Getting started
### Install dependencies
```
yarn
```
For the client
```
cd client
yarn
```

### Setup

Ensure a PostgreSQL database named `employee_directory` exists
```
 // on a Mac
createdb employee_directory
```

Setup the database
```
yarn db:setup
```

### Run the App

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

The server uses [Express](http://expressjs.com/) and [knex](https://knexjs.org/) to interact with the Postgres database.

### Features
- Pagination
- Ability to display by department, title, or location. 
- Search for employees on the page by name.
- Progressive Web App
- Mobile Friendly!


