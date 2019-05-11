const DataStore = require('nedb');
const express = require('express');

const { exec, count, findOne } = require('./utils');

const db = new DataStore({ filename: 'employees.db', autoload: true });
const app = express();
const port = process.env.PORT || 3001;
const pageSize = 50;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/employees', async (req, res) => {
  let err, total, result;
  const page = parseInt(req.query.page || 1, 0);
  const sortedPaginatedQuery = db
    .find({})
    .sort({ lastName: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  [err, total] = await count(db);
  if (err) return res.sendStatus(500);

  [err, result] = await exec(sortedPaginatedQuery);
  if (err) console.error(err);

  return res.json({ result, pageSize, pages: total / pageSize });
});

app.get('/api/employees/:id', async (req, res) => {
  const [err, result] = await findOne(db, { _id: req.params.id });
  if (err) {
    console.error(err);
    return res.sendStatus(500);
  }

  if (!result) return res.sendStatus(404);

  return res.json({ result });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
