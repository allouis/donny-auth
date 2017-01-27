const server = require('./server')

const port = process.env.PORT || 7777

server.listen(port, _ => console.log(`login-service listening on ${port}`))
