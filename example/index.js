const TokenStore = require("../client-library");

const store = new TokenStore("http://localhost:7777");

store.getToken(function(token) {
  if (token) {
    document.write("authed!");

    document.write(token);
  } else {
    document.write("nuh uh");
  }
});
