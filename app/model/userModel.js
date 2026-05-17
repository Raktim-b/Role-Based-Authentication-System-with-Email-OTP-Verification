const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);
const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;
