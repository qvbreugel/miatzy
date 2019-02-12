import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Confirm, Icon, Grid, Form } from "semantic-ui-react";

class RegisterProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      category: "",
      hasSubmitted: false,
      confirmOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //event.preventDefault();

    const context = this;

    const data = {
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
        context.setState({
          registration: res,
          name: "",
          price: "",
          category: ""
        });
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
        <Grid centered columns={2} style={{ marginTop: "2em" }}>
          <Grid.Column textAlign="center">
            <h2>Register a product</h2>
            <Form onSubmit={this.handleSubmit} method="POST">
              <Form.Group inline>
                <Form.Field>
                  <label>Item Name</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    placeholder="Item Name"
                    name="name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Item Price</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.price}
                    placeholder="Price"
                    name="price"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Item Category</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.category}
                    placeholder="Category"
                    name="category"
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            <Button onClick={this.showConfirm} style={{ marginTop: "2em" }}>
              Register Product
            </Button>
            <Confirm
              open={this.state.confirmOpen}
              content={
                "Are you sure you would like to add a product called " +
                this.state.name +
                " for a price of " +
                this.state.price +
                " with a category of " +
                this.state.category +
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

export default RegisterProducts;
