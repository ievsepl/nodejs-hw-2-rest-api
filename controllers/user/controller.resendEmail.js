const { User } = require("../../models");
const { sendEmail } = require("../../helpers/index");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });

  if (user.verificationToken === null) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  const mail = {
    to: email,
    subject: "Email reconfirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">
        Confirm your email
      </a>`,
  };

  await sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendEmail;
