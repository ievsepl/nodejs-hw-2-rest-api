const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/user/index");
const validator = require("../../middleWares/index");
router
  .route("/")
  .patch(
    validator.auth,
    validator.subscriptionValidator(),
    validator.ctrlWrapper(controllers.updateUserStatus)
  );

router
  .route("/register")
  .post(validator.userValidator(), validator.ctrlWrapper(controllers.register));

router
  .route("/login")
  .post(
    validator.userLoginValidator(),
    validator.ctrlWrapper(controllers.login)
  );

router
  .route("/logout")
  .post(validator.auth, validator.ctrlWrapper(controllers.logout));

router
  .route("/current")
  .post(validator.auth, validator.ctrlWrapper(controllers.currentUser));

module.exports = router;
