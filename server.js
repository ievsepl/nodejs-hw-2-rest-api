const app = require("./app");
const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
