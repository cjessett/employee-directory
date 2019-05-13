module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'employee_directory',
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: 'knex/seeds',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'employee_directory',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
  },
  useNullAsDefault: true,
};
