import React from "react";
import { Link } from "react-router-dom";

const NoUserNav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NoUserNav;
