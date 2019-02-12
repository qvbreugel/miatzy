import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Grid, Table } from "semantic-ui-react";
import NotLoggedIn from "../../components/NotLoggedIn";

class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      products: []
    };
  }
  componentDidMount() {
    const context = this;
    fetch("/isloggedin", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        context.setState({ isLoggedIn: response });
      })
      .catch(function(err) {
        console.log(err);
      });

    fetch("/products/view", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        context.setState({ products: response });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <Button
              animated
              as={Link}
              to="/profile"
              style={{ marginTop: "1.5em" }}
            >
              <Button.Content visible>Back to Profile</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
            <Grid centered columns={2} style={{ marginTop: "2em" }}>
              <Grid.Column textAlign="center">
                <h2>Your Products:</h2>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.products.map(product => (
                      <Table.Row>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>&#8364;{product.price}</Table.Cell>
                        <Table.Cell>{product.category}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan="4">
                        <Button
                          as={Link}
                          to="/products/print"
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="print" /> Print Stickers
                        </Button>
                        <Button
                          as={Link}
                          to="/products/register"
                          floated="right"
                          icon
                          labelPosition="left"
                          secondary
                          size="small"
                        >
                          <Icon name="plus" /> Add Product
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    );
  }
}

export default ViewProducts;
