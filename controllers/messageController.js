const Message = require("../models/messageModel");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }
  res.render("message_form", { title: "Create Message" });
};

exports.create_message_post = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("text").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create Message",
        errors: errors.array(),
      });
    }

    const message = new Message({
      user: res.locals.currentUser,
      title: req.body.title,
      text: req.body.text,
      timestape: Date.now(),
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];
