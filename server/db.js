const bcrypt = require("bcrypt");
const level = require("level");
const db = level("./.db", { valueEncoding: "json" });

exports.createUser = createUser;
exports.authUser = authUser;
exports.getByUsername = getByUsername;
exports.addOriginByUsername = addOriginByUsername;

function authUser(params, cb) {
  db.get(`password:${params.username}`, function(err, data) {
    if (err)
      return cb(err);

    bcrypt.compare(params.password, data.hash, function(err, res) {
      if (err || !res)
        return cb(err);

      getByUsername(params.username, cb);
    });
  });
}

function createUser(params, cb) {
  setPassword(
    { username: params.user.username, password: params.password },
    function(err) {
      if (err)
        return cb(err);

      setUser(params.user, cb);
    }
  );
}

function setPassword(params, cb) {
  bcrypt.hash(params.password, 8, function(err, hash) {
    if (err)
      return cb(err);

    db.put(`password:${params.username}`, { hash }, cb);
  });
}

function setUser(user, cb) {
  db.put(`username:${user.username}`, user, function(err) {
    cb(err, user);
  });
}

function getByUsername(username, cb) {
  db.get(`username:${username}`, cb);
}

function addOriginByUsername(params, cb) {
  getByUsername(params.username, function(err, user) {
    if (err)
      return cb(err);
    user.origins.push(params.origin);
    setUser(user, cb);
  });
}
