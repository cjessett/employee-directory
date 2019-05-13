module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
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
