var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {signout, signup , signin, isSignedIn} = require("../controllers/auth")

router.post("/signup", [
    check('name', 'name error').isLength({min:3}),
    check('email', "email error").isEmail(),
     // password must be at least 5 chars long
    check('password', "pass error").isLength({ min: 5 }),

],signup);
router.post("/signin", [
  check('email', "email is required").isEmail(),
// password must be at least 5 chars long
check('password', "password field is required").isLength({ min: 5 }),

],signin);
router.get("/signout", signout)

module.exports= router;