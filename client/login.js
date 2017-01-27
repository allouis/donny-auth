const bel = require("bel");
const url = new URL(
  decodeURIComponent(window.location.search.match(/[?&]origin=([^&]+)/)[1])
);
const origin = `${url.protocol}//${url.host}`;

var state = { origin };

document.body.appendChild(App(state));

function App(state) {
  function loginUser(event) {
    event.preventDefault();
    const inputs = event.target.children;
    // should dispatch thunk really...
    login(inputs.username.value, inputs.password.value, state.origin).then(
      _ => window.close()
    );
  }
  return bel`
    <div>
      <h1> Login to ${state.origin} </h1> 
      <form onsubmit=${loginUser}>
        <input name="username" type="text" placeholder="username">
        <input name="password" type="password" placeholder="password">
        <input type="submit" value="submit">
      </form>
    </div>
  `;
}

function login(username, password, origin) {
  return fetch(
    `/login?username=${username}&password=${password}&origin=${origin}`,
    { method: "POST", credentials: "include" }
  );
}
