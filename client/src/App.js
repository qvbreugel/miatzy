import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import RegisterProducts from "./pages/Products/Products";
import AmountRegistration from "./pages/Products/AmountRegistration";
import NoMatch from "./pages/NoMatch";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile/Profile";
import TicketNumber from "./pages/Profile/TicketNumber";
import ViewProducts from "./pages/Products/ViewProducts";
import PrintProducts from "./pages/Products/PrintProducts";
//import Test from "./pages/Login/LoginLayout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              path="/products/register"
              exact
              component={RegisterProducts}
            />
            <Route
              path="/products/registration"
              exact
              component={AmountRegistration}
            />
            <Route path="/products/view" exact component={ViewProducts} />
            <Route path="/products/print" exact component={PrintProducts} />
            <Route path="/users" component={Home} />
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
