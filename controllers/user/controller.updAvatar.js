const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const uniqName = `${req.user._id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, uniqName);

    const editImg = await jimp.read(tmpUpload);
    await editImg
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tmpUpload);

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", uniqName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};
module.exports = updAvatar;
