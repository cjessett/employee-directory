const faker = require('faker');
const fs = require('fs');

const company = 'Hooli';

const locations = [
  'New York City, NY',
  'Austin, TX',
  'San Francisco, CA',
  'Salt Lake City, UT',
];

const departments = {
  Design: [ 'Product Designer', 'UX Researcher', 'Senior UX Researcher' ],
  Engineering: [
    'Software Engineer',
    'Site Reliability Engineer',
    'Senior Software Engineer',
  ],
  Finance: [ 'Financial Analyst', 'Strategic Finance Analyst' ],
  Legal: [ 'Employment Counsel', 'User Policy Specialist' ],
  Marketing: [ 'Marketing Operations Manager', 'Presentation Designer' ],
  People: [ 'Recruiter', 'HR Director' ],
  Sales: [ 'Enterprise Account Manager', 'Solutions Engineer' ],
  Security: [ 'Security Operations Engineer', 'Application Security Engineer' ],
};

const random = arr => arr[Math.floor(Math.random() * arr.length)];

function generateEmployee() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}@${company.toLowerCase()}.com`;
  const department = random(Object.keys(departments));
  const jobTitle = random(departments[department]);

  return {
    firstName,
    lastName,
    email,
    jobTitle,
    department,
    phone: faker.phone.phoneNumberFormat(),
    avatar: faker.image.avatar(),
    location: random(locations),
  };
}


const employees = [];

for (let i = 0; i < 100; i++) { // eslint-disable-line no-plusplus
  employees.push(generateEmployee());
}

fs.writeFileSync('employees.json', JSON.stringify(employees));
