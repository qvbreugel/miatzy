import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, Visibility, Segment, Menu } from "semantic-ui-react";

import HomepageHeading from "./HomepageHeading";
import User from "../../components/Navbars/User";
import NoUser from "../../components/Navbars/NoUser";

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

class DesktopContainer extends Component {
  state = { isLoggedIn: false };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

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
  }

  render() {
    const { children } = this.props;
    const { fixed, isLoggedIn } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              {isLoggedIn ? <User fixed={fixed} /> : <NoUser fixed={fixed} />}
            </Menu>
            {console.log(isLoggedIn)}
            <HomepageHeading isLoggedIn={isLoggedIn} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default DesktopContainer;
