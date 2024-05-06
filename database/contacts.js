const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  text: String,
});

module.exports = mongoose.model("contacts", formSchema);
