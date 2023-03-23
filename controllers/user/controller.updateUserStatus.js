const { User } = require("../../models");

const updateUserStatus = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(subscription);
  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    return res.status(400).json({
      msg: "Bad Request!,subscription can be only 'starter', 'pro' or 'business'] ",
    });
  }
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!user) {
    return res.status(404).json({
      msg: "Not Found!",
    });
  }
  res.status(200).json(user);
};
module.exports = updateUserStatus;
