import React, { Component } from "react";

import Header from "../components/Header/Header";

class Home extends Component {
  componentWillMount() {
    fetch("isloggedin", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        //console.log(response["Logout"]);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Welcome to the Miatzy Website</h1>
      </div>
    );
  }
}

export default Home;
