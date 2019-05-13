function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err]);
}

const db = knex => ({
  getEmployees() {
    const cols = [
      'employees.id',
      'firstName',
      'lastName',
      'departments.name as department',
      'email',
      'phone',
      'avatar',
      'location',
      'job_titles.name as jobTitle',
    ];
    return knex('employees')
      .join('departments', 'departments.id', 'employees.department_id')
      .join('job_titles', 'job_titles.id', 'employees.job_title_id')
      .select(...cols);
  },
  getEmployeeById(id) {
    return this.getEmployees().where('employees.id', id).first();
  },
  async count(query) {
    const [err, result] = await to(query.count());
    if (err) return err;
    return result[0]['count(*)'];
  },
  getDepartments() {
    return to(knex('departments').pluck('name'));
  },
  getTitles() {
    return to(knex('job_titles').pluck('name'));
  },
  getLocations() {
    return to(knex('employees').distinct('location').pluck('location'));
  },
});

module.exports = {
  to,
  db,
};
