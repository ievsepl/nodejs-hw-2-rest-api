const login = require("./controller.login");
const logout = require("./controller.logout");
const register = require("./controller.register");
const currentUser = require("./controller.currentUser");
const updateUserStatus = require("./controller.updateUserStatus");
const updAvatar = require("./controller.updAvatar");

module.exports = {
  login,
  logout,
  register,
  currentUser,
  updateUserStatus,
  updAvatar,
};
