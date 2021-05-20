const mongoose = require('mongoose');
mongoose.connect(process.env.mongoDbUri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
mongoose.connection.on('error', 
  console.error.bind(console, 'connection error:'));

module.exports = mongoose;