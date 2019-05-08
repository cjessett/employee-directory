const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const rawData = fs.readFileSync('utils/employees.json');
const employees = JSON.parse(rawData);

app.get('/api/employees', (req, res) => res.json({ result: employees }));

app.listen(port, () => console.log(`App listening on port ${port}!`));
