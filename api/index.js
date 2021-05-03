const app = require('./config/express-config');

const port = process.env.port
const host = process.env.host
app.listen(port, console.log(`API listening on ${host}:${port}`));