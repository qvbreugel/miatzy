var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.get("/isloggedin", function(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  res.send(isLoggedIn);
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "miatzy"
});

function getConnection() {
  return pool;
}

router.post("/new", function(req, res, next) {
  const ticketNumber = req.body.ticketNumber;
  const name = req.body.name;
  const price = req.body.price;
  const product_id = req.body.product_id;
  const category = req.body.category;

  const connection = getConnection();

  const queryString =
    "INSERT INTO products (ticketnumber, product_id, name, price, category) VALUES (?,?,?,?,?)";

  connection.query(
    queryString,
    [ticketNumber, product_id, name, price, category],
    function(error, results, fields) {
      if (error) throw error;
      res.send({ Registration: "Succesful" });
    }
  );
});

module.exports = router;
