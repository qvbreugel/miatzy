import React, { Component } from "react";

import NotLoggedIn from "../../components/NotLoggedIn";
import RegisterProducts from "./RegisterProducts";

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
        {this.state.isLoggedIn ? <RegisterProducts /> : <NotLoggedIn />}
      </div>
    );
  }
}

export default Products;
