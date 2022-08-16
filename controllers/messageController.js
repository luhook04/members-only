const Message = require("../models/messageModel");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }
  res.render("message_form", { title: "Create Message" });
};

exports.create_message_post = [
  body("messageTitle").trim().isLength({ min: 1 }),
  body("messageText").trim().isLength({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create Message",
        errors: errors.array(),
      });
    }

    var message = new Message({
      user: req.user._id,
      title: req.body.messageTitle,
      text: req.body.messageText,
      timestamp: Date.now(),
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

exports.delete_message_post = (req, res, next) => {
  Message.findByIdAndRemove(req.body.messageId, function deleteMessage(err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
