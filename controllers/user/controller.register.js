const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({
    email,
    password: hashPass,
  });

  const subscription = newUser.subscription;

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = register;
