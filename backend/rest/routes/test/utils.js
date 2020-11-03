var mongoose = require('mongoose');
const User = mongoose.model('User');


exports.getUserNames = async () => {
  return await User.find();
}
 