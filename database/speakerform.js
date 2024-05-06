const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  companyName: String,
  phone: String,
  passes: String,
  exhibition: String,
  sponsorAssets: String,
});

module.exports = mongoose.model("speakersform", formSchema);
