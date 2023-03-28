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

router
  .route("/avatar")
  .patch(
    validator.auth,
    validator.upload.single("avatar"),
    validator.ctrlWrapper(controllers.updAvatar)
  );

router
  .route("/verify/:verificationToken")
  .get(validator.ctrlWrapper(controllers.verifyEmail));

router.route("/verify").post(validator.ctrlWrapper(controllers.resendEmail));

module.exports = router;
