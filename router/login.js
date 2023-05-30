const express = require("express");
const router = express.Router();
const login = require("../controller/login");
 
router.post('/userlogin',login.login)

module.exports = router;
