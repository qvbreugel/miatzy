import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <Link to="/profile">Back to Profile Page</Link>
            <div>
              <h2>Your Products:</h2>
              {this.state.products.map(product => (
                <div key={product.id}>{product.name}</div>
              ))}
            </div>
          </div>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    );
  }
}

export default ViewProducts;
