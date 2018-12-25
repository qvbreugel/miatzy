import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../components/Header/Header";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordMatch: "",
      ticketNumber: "",
      registration: "In Progress"
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const context = this;

    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordMatch: this.state.passwordMatch,
      ticketNumber: this.state.ticketNumber
    };

    console.log("Handling");

    fetch("/users/new", {
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
        <Header />
        <h1>Register Here!</h1>
        <form onSubmit={this.handleSubmit} method="POST">
          <label>Username</label>
          <input
            onChange={this.onChange}
            value={this.state.username}
            placeholder="Username"
            name="username"
          />
          <label>Email</label>
          <input
            onChange={this.onChange}
            value={this.state.email}
            placeholder="Email"
            name="email"
            type="email"
          />
          <label>Password</label>
          <input
            type="password"
            onChange={this.onChange}
            value={this.state.pwd}
            name="password"
          />
          <label>Re-Enter Password</label>
          <input
            type="password"
            onChange={this.onChange}
            value={this.state.passwordMatch}
            name="passwordMatch"
          />
          <label>Ticket Number</label>
          <input
            onChange={this.onChange}
            value={this.state.ticketNumber}
            name="ticketNumber"
            placeholder="Ticket Number"
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
        <p>
          {this.state.registration === "Succesful" ? (
            <Redirect to="/" />
          ) : (
            "..."
          )}
        </p>
      </div>
    );
  }
}

export default Register;
