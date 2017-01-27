const RPC = require("frame-rpc");
const url = new URL(document.referrer);
const origin = `${url.protocol}//${url.host}`;

const rpc = RPC(window, window.parent, origin, { getToken: getToken });

function fetchToken() {
  return fetch(`/token?origin=${origin}`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.text());
}

let failed = false;

function getToken(cb) {
  if (failed) {
    return cb(null);
  }
  fetchToken().then(function(token) {
    if (token) {
      return cb(token);
    }
    const win = window.open(`/login?origin=${encodeURIComponent(origin)}`);
    if (!win)
      return cb(null);
    win.addEventListener("unload", function self() {
      win.removeEventListener("unload", self);
      fetchToken().then(function(token) {
        if (!token) {
          failed = true;
        }
        return cb(token || null);
      });
    });
  });
}
