module.exports = controller;

function controller(db, jwt) {
  return { loginUser, sendToken };

  function loginUser(req, res, params) {
    db.authUser(params, function(err, user) {
      if (err) {
        res.writeHead(500);
        return res.end();
      }
      if (!user) {
        res.writeHead(401);
        return res.end();
      }
      db.addOriginByUsername(params, function(err, user) {
        if (err || !user) {
          res.writeHead(500);
          return res.end();
        }
        res.writeHead(200, {
          "Set-Cookie": `username=${user.username}; httponly;`
        });
        res.end();
      });
    });
  }

  function sendToken(req, res, params) {
    console.log(params);
    const cookie = req.headers.cookie || "";
    const username = cookie.split("=")[1];
    if (!username) {
      res.writeHead(401);
      return res.end();
    }
    db.getByUsername(username, function(err, user) {
      console.log(user);
      if (err) {
        res.writeHead(500);
        return res.end();
      }
      if (!user || user.origins.indexOf(params.origin) === -1) {
        res.writeHead(401);
        return res.end();
      }
      const token = jwt.createToken({ user });
      res.writeHead(200);
      res.end(token);
    });
  }
}
