var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var passport = require("passport");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "miatzy"
});

function getConnection() {
  return pool;
}

router.get("/isloggedin", function(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  res.send(isLoggedIn);
});

router.post("/ticketnumber", function(req, res, next) {
  const connection = getConnection();
});

module.exports = router;
