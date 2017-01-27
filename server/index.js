const http = require("http");
const router = require("routes")();
const { parse } = require("url");
const { resolve } = require("path");
const db = require("./db");
const jwt = require("./JWTManager")({
  keyPath: resolve(__dirname, "../.keys"),
  issuer: "donny-login"
});
const controller = require("./controller")(db, jwt);
const serveStatic = require("ecstatic")(resolve(__dirname, "../public"), {
  handleError: false
});

const server = http.createServer();

module.exports = server;

server.on("request", (req, res) => {
  const url = parse(req.url, true);
  const match = router.match(`${req.method} ${url.pathname}`);
  if (match) {
    return match.fn(req, res, Object.assign(url.query, match.params));
  } else {
    serveStatic(req, res);
  }
});

router.addRoute("POST /login", controller.loginUser);
router.addRoute("GET /token", controller.sendToken);
router.addRoute("GET /key", jwt.requestHandler);
