// ** Landing.component.js ** //

import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Row, CardGroup } from 'reactstrap';
import { Link } from 'react-router-dom'; 

export default class Landing extends Component {

    render() {
        return (
            <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="justify-content-center">
                <Card className="p-4">
                  <CardBody className="align-items-center">
                        <h1 >Are you a consumer?</h1>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                    <Row className="justify-content-center">
                      <Link to="/RegisterCustomer">
                        <Button style={{ width: '100%' }} color="primary" className="mt-3" active tabIndex={-1}>YES</Button>
                      </Link>
                    </Row>
                    <Row className="justify-content-center">
                      <Link to="/Login">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>NO</Button>
                      </Link>
                    </Row>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          <br></br>
        </Container>
      </div>
        );
    }
}