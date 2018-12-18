import React, { Component } from "react";

import NotLoggedIn from "../../components/NotLoggedIn";
import Header from "../../components/Header/Header";

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

  handleSubmit() {
    const amountOfItems = this.state.amountOfProducts;
  }
  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <Header />
            <h1>Register your products here!</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Enter the amount of products you wish to hand in</label>
              <input
                onChange={this.onChange}
                value={this.state.amountOfProducts}
                placeholder="Enter Amount"
                name="productAmount"
              />
            </form>
            <button>Enter</button>
          </div>
        ) : (
          <NotLoggedIn />
        )}{" "}
      </div>
    );
  }
}

export default Products;
