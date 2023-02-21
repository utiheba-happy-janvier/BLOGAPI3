const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of user is required"],
   //  minLength: 6,
   //  maxLength: 255,
  },
  email: {
    type: String,
    required: [true, "Email of user is required"],
    //  maxLength: ,
    //  minLength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    //  minLength: 6,
    //  maxLength: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});
userSchema.methods.correctPassword = async function (cpassword, password) {
  return await bcrypt.compare(cpassword, password);
};
module.exports = mongoose.model("User", userSchema);
