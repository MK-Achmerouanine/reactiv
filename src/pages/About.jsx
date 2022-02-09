import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Map from "../components/Map";

const About = () => {
  return (
    <>
      <Header bg="secondary" />
      <Container>
        <Row>
          <Col lg={6}>
            <h2>About</h2>
          </Col>
          <Col>
            <Map />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
