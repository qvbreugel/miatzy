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

router.get("/view", function(req, res, next) {
  const id = req.session.passport["user"]["user_id"];

  const connection = getConnection();

  const retrieveTicketnumber = "SELECT ticket_number FROM users WHERE id = ?";

  connection.query(retrieveTicketnumber, [id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    const ticketNumber = results[0]["ticket_number"];
    const queryString = "SELECT name FROM products WHERE ticketnumber = ?";

    connection.query(queryString, [ticketNumber], function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      res.send(results);
    });
  });
});

router.post("/new", function(req, res, next) {
  const name = req.body.name;
  const price = req.body.price;
  const product_id = req.body.product_id;
  const category = req.body.category;
  const id = req.session.passport["user"]["user_id"];

  const connection = getConnection();

  const retrieveTicketnumber = "SELECT ticket_number FROM users WHERE id = ?";
  connection.query(retrieveTicketnumber, [id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    const ticketNumber = results[0]["ticket_number"];
    const queryString =
      "INSERT INTO products (ticketnumber, product_id, name, price, category, sold, available) VALUES (?,?,?,?,?,'false','no')";

    connection.query(
      queryString,
      [ticketNumber, product_id, name, price, category],
      function(error, results, fields) {
        if (error) throw error;
        res.send({ Registration: "Succesful" });
      }
    );
  });
});

module.exports = router;
