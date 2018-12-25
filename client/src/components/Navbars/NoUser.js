import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NoUser = props => {
  return (
    <Container>
      <Menu.Item as="a" active>
        Home
      </Menu.Item>
      <Menu.Item as="a">Work</Menu.Item>
      <Menu.Item as="a">Company</Menu.Item>
      <Menu.Item as="a">Careers</Menu.Item>
      <Menu.Item position="right">
        <Button as={Link} to="/login" inverted={!props.fixed}>
          Log in
        </Button>
        <Button
          as={Link}
          to="/register"
          inverted={!props.fixed}
          primary={props.fixed}
          style={{ marginLeft: "0.5em" }}
        >
          Sign Up
        </Button>
      </Menu.Item>
    </Container>
  );
};

export default NoUser;
