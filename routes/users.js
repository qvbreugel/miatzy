var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "Localhost",
  user: "root",
  database: "miatzy"
});

function getConnection() {
  return pool;
}

router.post("/new", function(req, res, next) {
  const username = req.body.username;
  const pwd = req.body.pwd;
  const connection = getConnection();

  const queryString = "INSERT INTO users (username, pwd) VALUES (?,?)";

  connection.query(queryString, [username, pwd], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
