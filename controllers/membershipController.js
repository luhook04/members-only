const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/sign-up");
  }
  res.render("member_form", { title: "Member Entry" });
};

exports.member_post = [
  body("passcode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("No password entered."),

  (req, res, next) => {
    const errors = validationResult(req);
    var user = new User(res.locals.currentUser);

    if (!errors.isEmpty()) {
      res.render("member_form", {
        title: "Member Entry",
        errors: errors.array(),
      });
    } else if (req.body.passcode !== "hi") {
      res.render("member_form", {
        title: "Member Entry",
        error: "Wrong Password",
      });
    } else {
      user.isMember = true;
      User.findByIdAndUpdate(
        res.locals.currentUser._id,
        user,
        {},
        (err) => {
          if (err) return next(err);
          return res.redirect("/member");
        }
      );
    }
  },
];
