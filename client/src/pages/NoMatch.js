import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <h2>Ooops...</h2>
      <h2>This page could not be found</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NoMatch;
