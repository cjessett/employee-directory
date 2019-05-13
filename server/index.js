const express = require('express');

const knex = require('../knex');
const { to, db: DB } = require('./utils');

const db = DB(knex);
const app = express();
const port = process.env.PORT || 3001;
const pageSize = 50;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/departments', async (req, res) => {
  const [err, result] = await db.getDepartments();
  if (err) console.error(err);

  res.json({ result });
});

app.get('/api/titles', async (req, res) => {
  const [err, result] = await db.getTitles();
  if (err) console.error(err);

  res.json({ result });
});

app.get('/api/locations', async (req, res) => {
  const [err, result] = await db.getLocations();
  if (err) console.error(err);

  res.json({ result });
});

app.get('/api/employees', async (req, res) => {
  let err, result;

  const { department, jobTitle, location, page } = req.query; // eslint-disable-line
  const pageNo = parseInt(page || 1, 0);

  const employeesPromise = db
    .getEmployees()
    .modify((qb) => {
      if (department) qb.where({ department });
      if (jobTitle) qb.where({ jobTitle });
      if (location) qb.where({ location });
    });

  const count = await db.count(employeesPromise.clone());
  const pages = count > pageSize ? Math.ceil(count / pageSize) : 1;

  const paginatedEmployees = employeesPromise
    .orderBy('lastName')
    .offset((pageNo - 1) * pageSize)
    .limit(pageSize);

  [err, result] = await to(paginatedEmployees);
  if (err) {
    console.error(err);
    return res.sendStatus(500);
  }

  return res.json({ result, pageSize, pages });
});

app.get('/api/employees/:id', async (req, res) => {
  const [err, result] = await to(db.getEmployeeById(req.params.id));
  if (err) {
    console.error(err);
    return res.sendStatus(500);
  }

  if (!result) return res.sendStatus(404);

  return res.json({ result });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
