const faker = require('faker');

const { to } = require('../../server/utils');

const titles = [
  { name: 'Product Designer', department: 'Design' },
  { name: 'UX Researcher', department: 'Design' },
  { name: 'Senior UX Researcher', department: 'Design' },
  { name: 'Software Engineer', department: 'Engineering' },
  { name: 'Site Reliability Engineer', department: 'Engineering' },
  { name: 'Senior Software Engineer', department: 'Engineering' },
  { name: 'Financial Analyst', department: 'Finance' },
  { name: 'Strategic Finance Analyst', department: 'Finance' },
  { name: 'Employment Counsel', department: 'Legal' },
  { name: 'User Policy Specialist', department: 'Legal' },
  { name: 'Marketing Operations Manager', department: 'Marketing' },
  { name: 'Presentation Designer', department: 'Marketing' },
  { name: 'Recruiter', department: 'People' },
  { name: 'HR Director', department: 'People' },
  { name: 'Enterprise Account Manager', department: 'Sales' },
  { name: 'Solutions Engineer', department: 'Sales' },
  { name: 'Security Operations Engineer', department: 'Security' },
  { name: 'Application Security Engineer', department: 'Security' },
];

const departments = [
  { name: 'Design' },
  { name: 'Engineering' },
  { name: 'Finance' },
  { name: 'Legal' },
  { name: 'Marketing' },
  { name: 'People' },
  { name: 'Sales' },
  { name: 'Security' },
];

const locations = [
  'New York City, NY',
  'Austin, TX',
  'San Francisco, CA',
  'Salt Lake City, UT',
];

const company = 'Hooli';

const random = arr => arr[Math.floor(Math.random() * arr.length)];

function createEmployee() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}@${company.toLowerCase()}.com`;

  return {
    firstName,
    lastName,
    email,
    phone: faker.phone.phoneNumberFormat(),
    avatar: faker.image.avatar(),
    location: random(locations),
  };
}

exports.seed = async (knex) => {
  let err, records;

  await knex('employees').del();
  await knex('job_titles').del();
  await knex('departments').del();

  // Create departments
  [err, records] = await to(knex('departments').insert(departments));
  if (err) throw new Error('failed to create departments');
  console.log(`${departments.length} departments created`);

  // Create Job Titles
  const titlePromises = titles.map(async ({ name, department }) => {
    const record = await knex('departments').where({ name: department }).first(); //eslint-disable-line
    if (err) console.error(err);

    return knex('job_titles').insert({ name, department_id: record.id });
  });

  [err, records] = await to(Promise.all(titlePromises));
  if (err) throw new Error('failed to create titles');
  console.log(`${records.length} job titles created`);

  // Create Employees
  const employees = [];
  const desiredEmployees = 1000;
  faker.seed(desiredEmployees * 10);
  for (let i = 0; i < desiredEmployees; i++) { // eslint-disable-line 
    employees.push(createEmployee());
  }

  const employeePromises = employees.map(async (employee) => {
    const department = random(departments).name;
    const depTitles = titles.filter(t => t.department === department);
    const jobTitle = random(depTitles).name;

    const dep = await knex('departments').where({ name: department }).first();
    const title = await knex('job_titles').where({ name: jobTitle }).first();

    const row = { ...employee, department_id: dep.id, job_title_id: title.id };

    return knex('employees').insert(row);
  });

  [err, records] = await to(Promise.all(employeePromises));
  if (err) throw err;
  console.log(`${records.length} employees created`);
};
