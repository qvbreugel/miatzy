import React, { Component } from "react";
import { Link } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    fetch("users/logout", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        console.log(response["Logout"]);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>You are now logged out</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

export default Logout;
