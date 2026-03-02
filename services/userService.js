const User = require('../models/User');

const getUsersWhereRoleIs = async (role) => {
  return await User.find({ role }).select('-password');
};

module.exports = {
  getUsersWhereRoleIs
};