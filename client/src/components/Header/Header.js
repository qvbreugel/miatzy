import React, { Component } from "react";

import UserNav from "../Header/UserNav";
import NoUserNav from "../Header/NoUserNav";

class Header extends Component {
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
          <UserNav fixed={this.props.fixed} />
        ) : (
          <NoUserNav fixed={this.props.fixed} />
        )}{" "}
      </div>
    );
  }
}

export default Header;
