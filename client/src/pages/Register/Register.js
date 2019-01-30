import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

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
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        {this.state.registration === "Succesful" ? (
          <Redirect to="/" />
        ) : (
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="green" textAlign="center">
                <Icon name="handshake" /> Register as a supplier
              </Header>
              <Form size="large" onSubmit={this.handleSubmit} method="POST">
                <Segment stacked>
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.username}
                    name="username"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Email"
                    type="email"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.pwd}
                    name="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.passwordMatch}
                    name="passwordMatch"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Re-Enter Password"
                    type="password"
                  />
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.ticketNumber}
                    name="ticketNumber"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Ticket Number"
                  />

                  <Button color="green" fluid size="large">
                    Register
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )}{" "}
      </div>
    );
  }
}

export default Register;
