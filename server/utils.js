function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err]);
}

function count(db, opt) {
  return to(new Promise((resolve, reject) => {
    db.count(opt, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  }));
}

function exec(query) {
  return to(new Promise((resolve, reject) => {
    query.exec((e, d) => (e ? reject(e) : resolve(d)));
  }));
}

function findOne(db, opts) {
  return to(new Promise((resolve, reject) => {
    db.findOne(opts, (e, d) => (e ? reject(e) : resolve(d)));
  }));
}

module.exports = {
  to,
  count,
  exec,
  findOne,
};
