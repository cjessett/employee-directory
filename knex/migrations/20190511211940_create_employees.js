exports.up = async (knex) => {
  await knex.schema.createTable('employees', (table) => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique();
    table.string('phone').unique();
    table.string('avatar');
    table.string('location');
    table.integer('department_id').unsigned().references('departments.id');
    table.integer('job_title_id').unsigned().references('job_titles.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('employees');
};
