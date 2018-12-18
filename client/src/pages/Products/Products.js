import React, { Component } from "react";

import NotLoggedIn from "../../components/NotLoggedIn";
import ProductRegistration from "../Products/ProductRegistration";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    //this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentDidMount() {
    const context = this;
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
        context.setState({ isLoggedIn: response });
        console.log(this.state.isLoggedIn);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? <ProductRegistration /> : <NotLoggedIn />}{" "}
      </div>
    );
  }
}

export default Products;
