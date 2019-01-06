import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";

const Profile = () => {
  return (
    <div>
      <Header />
      <Link to="/changeticketnumber">
        <h2>Change Ticket Number</h2>
      </Link>
      <Link to="/products">
        <h2>Register Products</h2>
      </Link>
      <Link to="/products/view">
        <h2>View Products</h2>
      </Link>
    </div>
  );
};

export default Profile;
