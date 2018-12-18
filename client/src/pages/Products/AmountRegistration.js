import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";

class AmountRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountOfProducts: "",
      hasSubmitted: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ hasSubmitted: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Product Registration Here!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Amount of Products</label>
          <input
            onChange={this.onChange}
            value={this.state.amountOfProducts}
            placeholder="Amount"
            name="amountOfProducts"
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
        {this.state.hasSubmitted && (
          <Redirect
            to={`/products/registration/amount/${this.state.amountOfProducts}`}
          />
        )}
      </div>
    );
  }
}

export default AmountRegistration;
