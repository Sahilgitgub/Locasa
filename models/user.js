const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

// PassportLocalMongoose will automatically save a username and hased and salted value
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
