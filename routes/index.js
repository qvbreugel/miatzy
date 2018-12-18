var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/isloggedin", function(req, res, next) {
  const isLoggedIn = req.isAuthenticated();
  res.send(isLoggedIn);
});

module.exports = router;
