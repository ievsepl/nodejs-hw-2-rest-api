const ctrlWrapper = require("./ctrlWrapper");
const {
  contactValidator,
  updContactValidator,
  favoriteValidator,
} = require("./joiContactValidator");
const { userValidator, userLoginValidator } = require("./joiUserValidator");
const { auth } = require("./auth");

module.exports = {
  ctrlWrapper,
  contactValidator,
  favoriteValidator,
  updContactValidator,
  userValidator,
  userLoginValidator,
  auth,
};
