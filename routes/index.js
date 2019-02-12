var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var passport = require("passport");

//Mac Connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "miatzy",
  port: 8889
});

/*
//Windows Connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "miatzy"
});
*/

function getConnection() {
  return pool;
}

router.get("/isloggedin", function(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  res.send(isLoggedIn);
});

router.post("/ticketnumber", function(req, res, next) {
  const connection = getConnection();
  const id = req.session.passport["user"]["user_id"];
  const ticketNumber = req.body.ticketNumber;
  console.log(ticketNumber);
  const queryString = "UPDATE users SET ticket_number = ? WHERE users.id = ?";

  connection.query(queryString, [ticketNumber, id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log("Changed!");
  });
  res.end();
});

router.get("/currentticketnumber", function(req, res, next) {
  const connection = getConnection();
  const id = req.session.passport["user"]["user_id"];
  const queryString = "SELECT ticket_number FROM users WHERE id = ?";

  connection.query(queryString, [id], function(error, results, fields) {
    if (error) throw error;
    console.log(results[0]["ticket_number"]);
    res.send(results[0]);
  });
});

module.exports = router;
