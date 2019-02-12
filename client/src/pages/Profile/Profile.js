import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Grid } from "semantic-ui-react";

import Header from "../../components/Header/Header";
import User from "../../components/Navbars/User";

const Profile = () => {
  return (
    <div>
      <Header />
      <Grid
        centered
        columns={6}
        style={{
          marginTop: "2em"
        }}
      >
        <Grid.Column textAlign="center">
          <Menu vertical fluid>
            <Menu.Item as={Link} to="/changeticketnumber">
              Change Ticket Number
            </Menu.Item>
            <Menu.Item as={Link} to="/products/register">
              Register Products
            </Menu.Item>
            <Menu.Item as={Link} to="/products/view">
              View Products
            </Menu.Item>
            <Menu.Item as={Link} to="/products/print">
              Print Products
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Profile;
