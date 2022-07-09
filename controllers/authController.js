const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signup_get = (req, res, next) => {
  res.render("signup-form", { title: "Sign Up" });
};

exports.signup_post = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  body("password-confirm")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password's must match.");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("signup-form", {
        title: "Sign Up",
        errors: errors.array(),
      });
    } else {
      User.findOne({ username: req.body.username }).exec(function (
        err,
        found_user
      ) {
        if (err) {
          return next(err);
        }
        if (found_user) {
          res.render("signup-form", {
            title: "Sign Up",
            error: "Username taken",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err);
            }
            var user = new User({
              username: req.body.username,
              password: hashedPassword,
              isMember: false,
              isAdmin: false,
              avatar: "alien1",
            }).save((err) => {
              if (err) {
                return next(err);
              }
              res.redirect("/");
            });
          });
        }
      });
    }
  },
];

exports.login_get = (req, res) => {
  if (res.locals.currentUser) return res.redirect("/");
  res.render("login-form", { title: "Login" });
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.logout_get = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
