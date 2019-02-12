import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Container } from "semantic-ui-react";

import Barcode from "react-barcode";

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
        window.print();
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Grid container columns={2}>
            {this.state.products.map(product => (
              <Grid.Column style={{ marginRight: "0.05em" }}>
                <Barcode
                  value={
                    product.ticketnumber +
                    "." +
                    product.product_id +
                    " " +
                    "EUR" +
                    product.price
                  }
                />
              </Grid.Column>
            ))}
          </Grid>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    );
  }
}

export default ViewProducts;
