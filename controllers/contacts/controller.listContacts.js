// const { listContacts } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  // res.status("200").json(await listContacts());
  // res.status("200").json(await Contact.find({ owner: _id }).populate('owner',"email"));
  if (!favorite) {
    res.status("200").json(
      await Contact.find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      })
    );
  }
  res.status("200").json(
    await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    })
  );
};
