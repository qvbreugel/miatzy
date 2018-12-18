import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import NotLoggedIn from "../../components/NotLoggedIn";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
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
          <Redirect to="/products/registration" />
        ) : (
          <NotLoggedIn />
        )}
      </div>
    );
  }
}

export default Products;
