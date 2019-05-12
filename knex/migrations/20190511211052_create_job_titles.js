exports.up = async (knex) => {
  await knex.schema.createTable('job_titles', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('department_id').unsigned().references('departments.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('job_titles');
};
