import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default UserNav;
