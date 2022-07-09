const Message = require("../models/messageModel");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }
  res.render("message_form", { title: "Create Message" });
};
