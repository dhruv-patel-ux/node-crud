const express = require("express");
const router = express.Router();
const login = require("../controller/login");
const auth = require("../middelwere/auth");

router.post('/userlogin',auth,login.login)

module.exports = router;
