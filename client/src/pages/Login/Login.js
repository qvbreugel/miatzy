import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginStatus: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    const context = this;

    console.log("Handling");

    fetch("/users/login", {
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
        context.setState({ loginStatus: response });
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
        {this.state.loginStatus ? (
          <Redirect to="/" />
        ) : (
          <div>
            {" "}
            <h1>Login Here!</h1>
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
                name="password"
              />
              <div>
                <button>Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
