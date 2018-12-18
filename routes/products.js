var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.get("/isloggedin", function(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  res.send(isLoggedIn);
});

module.exports = router;
