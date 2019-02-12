import React, { Component } from "react";
import {
  Button,
  Grid,
  Icon,
  Confirm,
  Segment,
  Dimmer,
  Loader,
  Form
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: "",
      loginStatus: false,
      currentTicketNumber: "",
      confirmOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const context = this;
    fetch("/currentticketnumber", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        const currentTicketNumber = response["ticket_number"];
        context.setState({ currentTicketNumber: currentTicketNumber });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleSubmit(event) {
    //event.preventDefault();
    const data = {
      ticketNumber: this.state.ticketNumber
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

  showConfirm = () => this.setState({ confirmOpen: true });
  handleConfirm = () => {
    this.setState({ confirmOpen: false });
    this.handleSubmit();
  };
  handleCancel = () => this.setState({ confirmOpen: false });

  render() {
    return (
      <div>
        <Button animated as={Link} to="/profile" style={{ marginTop: "1.5em" }}>
          <Button.Content visible>Back to Profile</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
        <Grid centered columns={6} style={{ marginTop: "2em" }}>
          <Grid.Column textAlign="center">
            <h2>
              Current Ticket Number:{" "}
              {this.state.currentTicketNumber === "" ? (
                <Loader active inline="centered" />
              ) : (
                this.state.currentTicketNumber
              )}
            </h2>
            <Form onSubmit={this.handleSubmit} method="POST">
              <Form.Field>
                <label>Enter new ticket number</label>
                <input
                  onChange={this.onChange}
                  value={this.state.ticketNumber}
                  placeholder="Ticket Number"
                  name="ticketNumber"
                />
              </Form.Field>
            </Form>
            <Button onClick={this.showConfirm} style={{ marginTop: "1em" }}>
              Change Ticket Number
            </Button>
            <Confirm
              open={this.state.confirmOpen}
              content={
                "Are you sure you would like to change your ticket number to " +
                this.state.ticketNumber +
                "?"
              }
              cancelButton="No,take me back"
              confirmButton="Yes, I'm Sure!"
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
