import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const User = props => {
  return (
    <Container>
      <Menu.Item as="a" active>
        Home
      </Menu.Item>
      <Menu.Item as="a">Work</Menu.Item>
      <Menu.Item as="a">Company</Menu.Item>
      <Menu.Item as="a">Careers</Menu.Item>
      <Menu.Item position="right">
        <Button as={Link} to="/profile" inverted={!props.fixed}>
          Profile
        </Button>
        <Button
          as={Link}
          to="/logout"
          inverted={!props.fixed}
          primary={props.fixed}
          style={{ marginLeft: "0.5em" }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Container>
  );
};

export default User;
