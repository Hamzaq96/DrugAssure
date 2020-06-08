// ** Login.component.js ** //

import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardGroup, Alert } from 'reactstrap';
import { Link } from 'react-router-dom'; 
import axios from 'axios';


export default class Login extends Component {


    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       // this.sendBackData = this.sendBackData.bind(this);

        this.state = {
            username: '',
            password: '',
            message: '',
            visible: false
        }
    }

    toggle() {
      this.setState({
          visible: ! this.state.visible
      })
  }


    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/login', userObject,
        {crossDomain: true},
        {withCredentials: true},
        {mode: 'no-cors'},
          {
                      headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://joke-api-strict-cors.appspot.com/jokes/random',
                        'Accept': 'application/json'
                      }
                    }
        ) 
            .then((res) => {
                // console.log(res.data.error);
                if(res.data.error === "Invalid password"){(
                  this.setState({message: "You entered the wrong password"})
              )}
              else if(res.data.error === "Invalid username"){(
                  this.setState({message: "You entered the wrong username"})
              )}
              else{
                this.setState({message: "Login Successful!"})
                this.props.history.push('../Dashboard/Dashboard.js')
              }
            }).catch((error) => {
                console.log(error, "Login Error")
            });

        this.setState({ username: '', password: '' })
    }

      // sendBackData = () => {
      //   this.props.parentCallback(this.state.username);
      // }

    

    render() {
        return (
            <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={this.state.username} className="form-control" placeholder="Username" autoComplete="username" onChange={this.onChangeUsername}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" value={this.state.password} className="form-control" placeholder="Password" autoComplete="password" onChange={this.onChangePassword}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        {/* <Button type="submit" color="success" block onClick={this.toggle.bind(this)}>Login</Button> */}
                        <Button type="submit" color="success" block onClick={this.toggle.bind(this)}>Login</Button>
                        {/* <Button onClick={this.sendBackData}>click me to send back</Button> */}
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/Register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          <br></br>
          <Row className="justify-content-center">
              <Alert color="info" isOpen={this.state.visible} toggle={this.toggle.bind(this)}>
                  {this.state.message}
              </Alert>
          </Row>
        </Container>
      </div>
        );
    }
}