import React from "react";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div>
      <h1>Uh oh..</h1>
      <h2>You must be logged in to visit this page</h2>
      <Link to="/login">Login Here</Link>
    </div>
  );
};

export default NotLoggedIn;
