import React, { Component } from "react";

import Header from "../../components/Header/Header";

class ProductRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { amountOfProducts: "" };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
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
      </div>
    );
  }
}

export default ProductRegistration;
