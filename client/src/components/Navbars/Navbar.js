import React, { Component } from "react";

import User from "./User";
import NoUser from "./NoUser";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  componentDidMount() {
    const context = this;
    fetch("/isloggedin", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        context.setState({ isLoggedIn: response });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <User fixed={this.props.fixed} />
        ) : (
          <NoUser fixed={this.props.fixed} />
        )}{" "}
      </div>
    );
  }
}

export default Navbar;
