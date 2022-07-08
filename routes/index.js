var express = require("express");
var router = express.Router();
const auth_controller = require("../controllers/authController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Member's Only", user: req.user });
});

router.get("/sign-up", auth_controller.signup_get);
router.post("/sign-up", auth_controller.signup_post);

router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.login_post);

module.exports = router;
