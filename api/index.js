const config = require('config');
const app = require('./config/express-config');

const port = config.get('api.port');
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});