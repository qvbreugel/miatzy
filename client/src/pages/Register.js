import React, { Component } from "react";

import Header from "../components/Header";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      pwd: this.state.pwd
    };

    //Log Input Data
    console.log(data);

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
          <label>Password</label>
          <input
            type="password"
            onChange={this.onChange}
            value={this.state.pwd}
            name="pwd"
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
