import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: "",
      product_id: 1,
      name: "",
      price: "",
      category: "",
      hasSubmitted: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const context = this;

    const data = {
      ticketNumber: this.state.ticketNumber,
      product_id: this.state.product_id,
      name: this.state.name,
      price: this.state.price,
      category: this.state.category
    };

    fetch("/products/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        console.log(response["Registration"]);
        const res = response["Registration"];
        context.setState({ registration: res });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Link to="/profile">Back to Profile Page</Link>
        <h1>Register Products</h1>
        <form onSubmit={this.handleSubmit} method="POST">
          <label>Ticket Number</label>
          <input
            onChange={this.onChange}
            value={this.state.ticketNumber}
            placeholder="Ticket Number"
            name="ticketNumber"
          />
          <label>Item Description</label>
          <input
            onChange={this.onChange}
            value={this.state.name}
            placeholder="Item Description"
            name="name"
          />
          <label>Item Price</label>
          <input
            onChange={this.onChange}
            value={this.state.price}
            placeholder="Price"
            name="price"
          />
          <label>Item Category</label>
          <input
            onChange={this.onChange}
            value={this.state.category}
            placeholder="Category"
            name="category"
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
