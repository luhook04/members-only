const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 15 },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  avatar: {
    type: String,
    required: true,
    enum: ["alien1", "alien2", "alien3"],
    default: "alien1",
  },
});

module.exports = mongoose.model("User", UserSchema);
