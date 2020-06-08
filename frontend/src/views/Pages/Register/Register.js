import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


export default class Register extends Component {

    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeOccupation = this.onChangeOccupation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            occupation: 'Lab Engineer',
            wallet: '',
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

    onChangeFirstName(e) {
        this.setState({ firstname: e.target.value })
    }


    onChangeLastName(e) {
        this.setState({ lastname: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeOccupation(e) {
        this.setState({ occupation: e.target.value })
    }

    
   

    onSubmit(e) {
        e.preventDefault()
        var data


        axios.post('/addwallet',
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
                console.log(res.data);
                this.setState({wallet: res.data});
                data = res.data;
                console.log("The wallet address: ",data);

            }).catch((error) => {
                console.log(error);
            });
        
            const userObject = {
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                password: this.state.password,
                occupation: this.state.occupation,
                wallet: this.state.wallet
            };
            console.log("Wallet: ",this.state.wallet);
            console.log("Data: ",data);

        
        axios.post('http://172.25.0.2:8080/register', userObject,
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
                console.log(res.data)
                if(res.data.result === "Registration Successful"){(
                    this.setState({message: "Registration Successful"})
                )}
                else if(res.data.result === "Username already Exists!!"){(
                    this.setState({message: "Registration Failed. Username already taken"})
                )}
                    
            }).catch((error) => {
                console.log(error)
            });
        

        this.setState({ username: '', firstname: '', lastname: '', password: '', occupation: ''})   
    };
    
    


    render() {

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                            <Form onSubmit={this.onSubmit}>
                                <h1>Register</h1>
                                <p className="text-muted">Create your account</p>
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" value={this.state.username} className="form-control" placeholder="Username" autoComplete="username" onChange={this.onChangeUsername}/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" value={this.state.firstname} className="form-control" placeholder="First Name" autoComplete="firstname" onChange={this.onChangeFirstName}/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-user"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" value={this.state.lastname} className="form-control" placeholder="Last Name" autoComplete="lastname" onChange={this.onChangeLastName}/>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-lock"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                    <Input placeholder="Occupation" type="select" value={this.state.occupation} name="select" id="exampleSelect" autoComplete="occupation" onChange={this.onChangeOccupation}>
                                    <option>Lab Engineer</option>
                                    <option>Manufacturer</option>
                                    <option>Vendor</option>
                                    <option>Pharmicist</option>
                                    </Input>
                                    </InputGroup>
                                
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="icon-lock"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" value={this.state.password} className="form-control" placeholder="Password" autoComplete="password" onChange={this.onChangePassword}/>
                                </InputGroup>
                            
                                <Button type="submit" color="success" block onClick={this.toggle.bind(this)}>Create Account</Button>
                                <Link to="/Login">
                                    <Button color="primary" className="mt-3" block>Already have an account? Login</Button>
                                </Link>
                            </Form>
                            </CardBody>
                            <CardFooter className="p-4">
                            <Row>
                                <Col xs="12" sm="6">
                                <Button className="btn-google mb-1" block><span>Login from Google</span></Button>
                                </Col>
                                <Col xs="12" sm="6">
                                <Button className="btn-twitter mb-1" block><span>Login from Facebook</span></Button>
                                </Col>
                            </Row>
                            </CardFooter>
                        </Card>
                        </Col>
                    </Row>
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


// export default AlertExample;
