const mongoose = require('mongoose');

const user = new mongoose.Schema({
  label: {
    type: String
  },
  data: {
    type: Number
  }
});

module.exports = User = mongoose.model('user', user);
