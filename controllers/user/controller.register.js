const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid").v4;
const { User } = require("../../models");
const { sendEmail } = require("../../helpers/index");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }
  const verificationToken = uuid();
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hashPass,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
        Confirm your email
      </a>`,
  };

  await sendEmail(mail);

  const subscription = newUser.subscription;

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
