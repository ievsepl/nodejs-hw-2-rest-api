const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const subscription = user.subscription;

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  // const decodeToken = jwt.decode(token);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
