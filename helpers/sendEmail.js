const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "",
//   from: "ievsepl@gmail.com",
//   subject: "",
//   html: "",
// };
// sgMail
//   .send(email)
//   .then(() => {
//     console.log("it`s ok");
//   })
//   .catch((e) => console.log(e.message));

const sendEmail = async (data) => {
  const email = { ...data, from: "ievsepl@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = sendEmail;
