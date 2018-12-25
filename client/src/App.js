import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import AmountRegistration from "./pages/Products/AmountRegistration";
import ProductRegistration from "./pages/Products/ProductRegistration";
import NoMatch from "./pages/NoMatch";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile/Profile";
import TicketNumber from "./pages/Profile/TicketNumber";
import HPL from "./pages/Home/Homepagelayout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/products" exact component={Products} />
            <Route
              path="/products/registration"
              exact
              component={AmountRegistration}
            />
            <Route
              path="/products/registration/amount/:amountOfProducts"
              exact
              component={ProductRegistration}
            />
            <Route path="/users" component={Home} />
            <Route path="/hpl" component={HPL} />
            <Route path="/logout" component={Logout} />
            <Route path="/profile" component={Profile} />
            <Route path="/changeticketnumber" component={TicketNumber} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
