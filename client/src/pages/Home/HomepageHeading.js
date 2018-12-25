import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Miatzy Bring &#38; Buy"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Let us sell your stuff while you enjoy the convention!"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button primary size="huge" as={Link} to="/register">
      Become a Supplier
    </Button>
  </Container>
);

export default HomepageHeading;
