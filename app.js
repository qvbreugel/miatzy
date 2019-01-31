var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var mysql = require("mysql");

//Authentication Packages
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var MySQLStore = require("express-mysql-session");
var bcrypt = require("bcrypt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*
//Windows Options
var options = {
  host: "localhost",
  user: "root",
  database: "miatzy"
};
*/

//Mac Options
var options = {
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "miatzy",
  port: 8889
};

var sessionStore = new MySQLStore(options);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    store: sessionStore,
    saveUninitialized: false
    //cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

/*
//Windows DB Setup
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "miatzy"
});
*/

//Mac DB Setup
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "miatzy",
  port: 8889
});

function getConnection() {
  return pool;
}

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log(username);
    console.log(password);

    const connection = getConnection();
    connection.query(
      "SELECT id, password FROM users WHERE username = ?",
      [username],
      function(err, results, fields) {
        if (err) {
          done(err);
        }

        if (results.length === 0) {
          done(null, false);
        } else {
          const hash = results[0].password.toString();

          bcrypt.compare(password, hash, function(err, response) {
            if (response) {
              console.log(results[0].id);
              return done(null, { user_id: results[0].id });
            } else {
              return done(null, false);
            }
          });
        }
      }
    );
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
