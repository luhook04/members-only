var express = require("express");
var router = express.Router();
const auth_controller = require("../controllers/authController");
const membershipController = require("../controllers/membershipController");
const messageController = require("../controllers/messageController");
const Message = require("../models/messageModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find()
    .sort([["timestamp", "descending"]])
    .populate("user")
    .exec(function (err, messages) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Member's Only",
        messages: messages,
      });
    });
});
router.post("/", messageController.delete_message_post);

router.get("/sign-up", auth_controller.signup_get);
router.post("/sign-up", auth_controller.signup_post);

router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);
router.get("/logout", auth_controller.logout_get);

router.get("/member", membershipController.member_get);
router.post("/member", membershipController.member_post);

router.get("/create-message", messageController.create_message_get);
router.post("/create-message", messageController.create_message_post);

router.get("/admin", membershipController.admin_get);
router.post("/admin", membershipController.admin_post);

module.exports = router;
