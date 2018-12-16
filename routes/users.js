var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var expressValidator = require("express-validator");
var bcrypt = require("bcrypt");
var passport = require("passport");
const saltRounds = 10;

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
  req.checkBody("username", "Username cannot be empty").notEmpty();
  req
    .checkBody("username", "Username must be between 4-15 characters long")
    .len(4, 15);
  req.checkBody("email", "Please enter a valid email address").isEmail();
  req
    .checkBody("email", "Email cannot be longer than 100 characters")
    .len(4, 100);
  req
    .checkBody("password", "Password must be at least 8 characters long")
    .len(8, 100);
  req
    .checkBody(
      "password",
      "Password must include one lowercase letter, one uppercase letter, a number and a special character"
    )
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
      "i"
    );
  req
    .checkBody("passwordMatch", "Passwords do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    //Render Error
  } else {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const connection = getConnection();

    const queryString =
      "INSERT INTO users (username, email, password) VALUES (?,?,?)";

    bcrypt.hash(password, saltRounds, function(err, hash) {
      connection.query(queryString, [username, email, hash], function(
        error,
        results,
        fields
      ) {
        if (error) throw error;

        connection.query(
          "SELECT LAST_INSERT_ID() as user_id",
          (error, results, fields) => {
            if (error) throw error;
            console.log(results);
            const user_id = results[0];

            console.log(user_id);
            req.login(user_id, err => {
              res.send({ Registration: "Succesful" });
            });
          }
        );
      });
    });
  }
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

module.exports = router;
