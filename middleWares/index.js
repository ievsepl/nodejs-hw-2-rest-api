const ctrlWrapper = require("./ctrlWrapper");
const {
  contactValidator,
  updContactValidator,
  favoriteValidator,
} = require("./joiContactValidator");
const {
  userValidator,
  userLoginValidator,
  subscriptionValidator,
} = require("./joiUserValidator");
const { auth } = require("./auth");
const { upload } = require("./upload");

module.exports = {
  ctrlWrapper,
  contactValidator,
  favoriteValidator,
  updContactValidator,
  userValidator,
  userLoginValidator,
  auth,
  subscriptionValidator,
  upload,
};
