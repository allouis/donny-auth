const RPC = require("frame-rpc");
module.exports = TokenStore

function TokenStore(src){
  const frame = document.createElement("iframe");
  frame.style.display = "none";
  frame.src = src;
  document.body.appendChild(frame);
  var url = new URL(src);
  var origin = url.protocol + "//" + url.host;

  frame.addEventListener("load", () => {
    this.rpc = RPC(window, frame.contentWindow, origin);
  });
}

TokenStore.prototype.getToken = function getToken(cb) {
  if (!this.rpc) {
    return setTimeout(this.getToken.bind(this), 10, cb); 
  }
  this.rpc.call('getToken', cb)
}
