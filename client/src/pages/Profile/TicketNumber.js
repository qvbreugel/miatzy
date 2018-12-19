import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: "",
      loginStatus: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      ticketNumber: this.state.username
    };

    //const context = this;

    fetch("/ticketnumber", {
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
        //context.setState({ loginStatus: response });
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
        <div>
          <h1>Change Ticket Number</h1>
          <form onSubmit={this.handleSubmit} method="POST">
            <input
              onChange={this.onChange}
              value={this.state.ticketNumber}
              placeholder="Ticket Number"
              name="ticketNumber"
            />
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
