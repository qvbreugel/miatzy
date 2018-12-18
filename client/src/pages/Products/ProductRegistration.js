import React, { Component } from "react";

import Header from "../../components/Header/Header";
import RegistrationForm from "./RegistrationForm";

class ProductRegistration extends Component {
  render() {
    return (
      <div>
        <Header />
        <h3>Amount: {this.props.match.params.amountOfProducts}</h3>
        <RegistrationForm />
      </div>
    );
  }
}

export default ProductRegistration;
