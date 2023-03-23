const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const uniqName = `${req.user._id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, uniqName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", uniqName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};
module.exports = updAvatar;
