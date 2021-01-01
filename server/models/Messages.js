const { model, Schema } = require("mongoose");

const MessagesSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
});

module.exports = model("Messages", MessagesSchema);
