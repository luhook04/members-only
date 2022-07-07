const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, minLength: 1, maxLength: 35 },
  text: { type: String, required: true, minLength: 1, maxLenght: 1000 },
  timestamp: { type: Date, default: Date.now, required: true },
});

MessageSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Message", MessageSchema);
