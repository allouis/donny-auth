exports.authUser = authUser;
exports.getByUsername = getByUsername;
exports.addOriginByUsername = addOriginByUsername;

var users = [
  {
    username: "donny",
    email: "donny@donson.com",
    permissions: [ "admin" ],
    origins: []
  }
];

function authUser(params, cb) {
  if (params.username !== "donny") {
    return process.nextTick(cb, null, null);
  }
  if (params.password !== "donnypass") {
    return process.nextTick(cb, null, null);
  }
  process.nextTick(cb, null, users[0]);
}

function getByUsername(username, cb) {
  if (username !== "donny") {
    return process.nextTick(cb, null, null);
  }
  process.nextTick(cb, null, users[0]);
}

function addOriginByUsername(params, cb) {
  if (params.username !== "donny") {
    return process.nextTick(cb, null, null);
  }
  users[0].origins.push(params.origin);
  process.nextTick(cb, null, users[0]);
}
