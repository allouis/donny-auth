# donny-auth

server directory contains a basic auth service with login and retrieve token using session cookie (scoped to origin)

client directory contains the shit that will be in an iframe (index) or redirected to (login)

example directory is example usage of the client library

the JWTManager is pulled out of the jwt experiment i did before, needs configurable headers imo

To invalidate a login remotely you'd just use a server side session store and invalidate the session

To revoke a websites access to your login completely you would remove the origin from the users list of allowed ones

### usage
```
yarn
yarn build
yarn start &
yarn example &
```

There is no db, just one user `donny` `donnypass`
