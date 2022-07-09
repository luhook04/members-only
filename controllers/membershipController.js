const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/sign-up");
  }
  res.render("member_form", { title: "Member Entry" });
};
