import React, { Component } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Form, 
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Progress,
  Row
} from 'reactstrap';
import QrReader from "react-qr-reader";
import axios from 'axios';

// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));


class Dashboard extends Component {
  constructor(props) {
    super(props);
    //SUBMIT FEEDBACK
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
    this.onSubmitFeedback = this.onSubmitFeedback.bind(this);
    // ADD DRUG
    this.onChangeDrugName = this.onChangeDrugName.bind(this);
    this.onSubmitBlock = this.onSubmitBlock.bind(this);
    //ADD TRANSACTION
    this.onChangeWalletAdd = this.onChangeWalletAdd.bind(this);
    this.onSubmitTransaction = this.onSubmitTransaction.bind(this);
    //UPDATE DRUG DATA
    this.onChangeUpdateData = this.onChangeUpdateData.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    /////////////////////////////////////////////
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleScan = this.toggleScan.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleUpdateScan = this.handleUpdateScan.bind(this);

    this.state = {
      //FEEDBACK
      feedback: '',
      feedbackMessage: '',
      //ADD DRUG
      Data: '',
      addBlockMessage: '',
      //ADD TRANSACTION
      From:'',                     //Wallet Address
      To: 'No Hash detected',      //Hash 
      addTransMessage:'',
      //UPDATE DRUG DATA
      UpdateData: '',
      CurrentDrugName: '',
      UpdatedDrugName: '',
      Hash:'',
      updateMessage:'',
      //////////////////
      collapse: false,
      collapseScan: false,
      collapseSearch: false,
      collapseFeedback: false,
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      delay: 300,
      dropdownOpen: false,
      radioSelected: 2,
      visible: false,
      visibleMessageAdd: false,
      visibleTransAdd: false,
      visibleUpdatedDrugCard: false
    }
  }

  onChangeFeedback(e) {
    this.setState({ feedback: e.target.value })
}

  onChangeDrugName(e) {
    this.setState({ Data: e.target.value })
  }

  onChangeWalletAdd(e) {
    this.setState({ From: e.target.value })
  }

  onChangeUpdateData(e) {
    this.setState({ UpdateData: e.target.value })
  }

  handleScan(data) {
    if (data) {
      this.setState({
        To: data
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  handleUpdateScan(data) {
    if (data) {
      this.setState({ Hash: data });

      const userObject = {
        Hash: data
    };
   
      axios.post('/getblock', userObject,
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
        this.setState({ CurrentDrugName: res.data })
      })
      .catch((error) => {
        console.log(error)
      }); 
    }
  }
  

///////////////////////////

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      collapse: !this.state.collapse,
    });
  }

  toggleFeedbackMessage() {
    this.setState({
      visible: ! this.state.visible
    });
  }

  toggleAddBlockMessage() {
    this.setState({
      visibleMessageAdd: ! this.state.visibleMessageAdd
    });
  }

  toggleAddTransMessage() {
    this.setState({
      visibleTransAdd: ! this.state.visibleTransAdd
    });
  }

  toggleUpdateAlert() {
    this.setState({
      visibleUpdatedDrugCard: ! this.state.visibleUpdatedDrugCard
    });
  }

  toggleScan() {
    this.setState({
      collapseScan: !this.state.collapseScan
    });
  }

  toggleFeedback() {
    this.setState({
      collapseFeedback: !this.state.collapseFeedback
    })
  }

  toggleSearch() {
    this.setState({
      collapseSearch: !this.state.collapseSearch
    })
  }
  
  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  onSubmitFeedback(e) {
    e.preventDefault()

    const userObject = {
        feedback: this.state.feedback
    };
   
    
    axios.post('/feedback', userObject,
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
          console.log(res.data.result)
          console.log(this.props.username)
          if(res.data.result === "Feedback given"){(
            this.setState({feedbackMessage: "Feedback sent successfully"})
        )}   
        })
        .catch((error) => {
            console.log(error)
        });
    

    this.setState({ feedback: ''})   
};


onSubmitBlock(e) {
  e.preventDefault()

  const userObject = {
      Data: this.state.Data
  };
 

  axios.post('/addblock', userObject,
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
        console.log(res.data.Hash)
        if(res.data.Hash !== null){(
          this.setState({addBlockMessage: "Drug added to the blockchain successfully"})
      )}
      })
      .catch((error) => {
          console.log(error)
      });
  

  this.setState({ Data: ''})   
};


onSubmitTransaction(e) {
  e.preventDefault()

  const userObject = {
      From: this.state.From,
      To: this.state.To
  };
 

  axios.post('/transaction', userObject,
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
        if(res.data.Hash !== null){(
          this.setState({addTransMessage: "Transaction performed successsfully!"})
      )}
      })
      .catch((error) => {
          console.log(error)
      });
  

  this.setState({ From: '', To: ''})   
};


onSubmitUpdate(e) {
  e.preventDefault()

  const userObject = {
      Data: this.state.UpdateData,
      Hash: this.state.Hash
  };
 

  axios.post('/updateblock', userObject,
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
        axios.post('/getblock', userObject,
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
          this.setState({ UpdatedDrugName: res.data })
              if(res.data){(
          this.setState({updateMessage: "Drug Data updated successfully!"})
      )}
        })
        .catch((error) => {
          console.log(error)
        });
      })
      .catch((error) => {
          console.log(error)
      });
  

  this.setState({ UpdataData: '', Hash: ''})   
};



  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xl="6">
            <Card>
              <CardHeader>
                <strong>Add a Drug</strong>
                <div className="card-header-actions">
                    <i className="icon-plus" onClick={this.toggle}></i>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                <Form className="was-validated" onSubmit={this.onSubmitBlock}>
                      <FormGroup>
                        <Label htmlFor="inputWarning2i">Drug Name</Label>
                        <Input type="text" value={this.state.Data} onChange={this.onChangeDrugName} className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup>
                      {/* <FormGroup>
                        <Label htmlFor="inputWarning2i">Potency (mgs) </Label>
                        <Input type="text" className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputWarning2i">Manufacturer </Label>
                        <Input type="text" className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup> */}
                      <Row>
                        <Col>
                        <Button type="submit" size="sm" color="success" onClick={this.toggleAddBlockMessage.bind(this)}><i className="fa fa-check"></i> Submit</Button>
                        </Col>
                        <Col>
                        <Alert color="info" isOpen={this.state.visibleMessageAdd} toggle={this.toggleAddBlockMessage.bind(this)}>
                          {this.state.addBlockMessage}
                        </Alert>
                        </Col>
                      </Row>
                    </Form>
                </CardBody>
                
              </Collapse>
              <CardFooter>
                <Button color="primary" onClick={this.toggle} className={'mb-1'} id="toggleCollapse1">Click to Add a Drug</Button>
              </CardFooter>
            </Card>
          </Col>

          <Col xl="6">
            <Card>
              <CardHeader>
                <strong>Add a transaction</strong>
                <div className="card-header-actions">
                    <i className="icon-magnifier-add" onClick={this.toggleScan}></i>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapseScan} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                <Form className="was-validated" onSubmit={this.onSubmitTransaction}>
                      <FormGroup>
                        <Label htmlFor="inputWarning2i">Wallet Address</Label>
                        <Input type="text" value={this.state.From} onChange={this.onChangeWalletAdd} className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid wallet address</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: "50%" }}
                        />
                        <br></br>
                        <Label htmlFor="inputWarning2i">Scanned Hash</Label>
                        <Input disabled type="text" value={this.state.To} className="form-control-warning" id="inputWarning2i" required />
                      </FormGroup>
                      <Row>
                        <Col>
                        <Button type="submit" size="sm" color="success" onClick={this.toggleAddTransMessage.bind(this)}><i className="fa fa-check"></i> Submit</Button>
                        </Col>
                        <Col>
                        <Alert color="info" isOpen={this.state.visibleTransAdd} toggle={this.toggleAddTransMessage.bind(this)}>
                          {this.state.addTransMessage}
                        </Alert>
                        </Col>
                      </Row>
                    </Form>
                </CardBody>
              </Collapse>
              <CardFooter>
                <Button color="primary" onClick={this.toggleScan} className={'mb-1'} id="toggleCollapse2">Click here to Timestamp a medicine through transaction</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
        <Col xl="6">
            <Card>
              <CardHeader>
                <strong>Update Drug Data</strong>
                <div className="card-header-actions">
                    <i className="icon-magnifier" onClick={this.toggleSearch}></i>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapseSearch} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                      
                <Form className="was-validated" onSubmit={this.onSubmitUpdate}>
                       <FormGroup>
                        <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleUpdateScan}
                        style={{ width: "50%" }}
                        />
                        <br></br>
                        <Label htmlFor="inputWarning2i">Scanned Hash</Label>
                        <Input disabled type="text" value={this.state.Hash} className="form-control-warning" id="inputWarning2i" required />
                      </FormGroup>
                      <FormGroup>
                      
                        <Card className="text-white bg-info">
                          <CardHeader>
                            Current Scanned Drug
                          </CardHeader>
                          <CardBody>
                            <strong>Drug Name: </strong> {this.state.CurrentDrugName}
                          </CardBody>
                        </Card>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputWarning2i">New Drug Name</Label>
                        <Input type="text" value={this.state.UpdateData} onChange={this.onChangeUpdateData} className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid drug name</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup>
                      <Row>
                        <Col>
                        <Button type="submit" size="sm" color="success" onClick={this.toggleUpdateAlert.bind(this)}><i className="fa fa-check"></i> Update</Button>
                        </Col>
                        <Col>
                        <Alert color="info" isOpen={this.state.visibleUpdatedDrugCard} toggle={this.toggleUpdateAlert.bind(this)}>
                          {this.state.updateMessage}
                        </Alert>
                        </Col>
                      </Row>
                      <br></br>
                      <FormGroup>
                        <Card className="text-white bg-success" isOpen={this.state.visibleUpdatedDrugCard}>
                          <CardHeader>
                            Updated Drug
                          </CardHeader>
                          <CardBody>
                            <strong>Drug Name: </strong> {this.state.UpdatedDrugName}
                          </CardBody>
                        </Card>
                      </FormGroup>
                    </Form>
                </CardBody>
              </Collapse>
              <CardFooter>
                <Button color="primary" onClick={this.toggleSearch} className={'mb-1'} id="toggleCollapse3">Click to Update a Drug</Button>
              </CardFooter>
            </Card>
          </Col>

          <Col xl="6">
            <Card>
              <CardHeader>
                <strong>Send a Feedback</strong>
                <div className="card-header-actions">
                    <i className="icon-envelope" onClick={this.toggleFeedback}></i>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapseFeedback} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                <Form className="was-validated" onSubmit={this.onSubmitFeedback}>
                      <FormGroup>
                        <Label htmlFor="inputWarning2i">Enter your feedback below</Label>
                        <Input type="textarea" value={this.state.feedback} onChange={this.onChangeFeedback} className="form-control-warning" id="inputWarning2i" required />
                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                      </FormGroup>
                      <Row>
                        <Col>
                        <Button type="submit" size="sm" color="success" onClick={this.toggleFeedbackMessage.bind(this)}><i className="fa fa-check"></i> Submit</Button>
                        </Col>
                        <Col>
                        <Alert color="info" isOpen={this.state.visible} toggle={this.toggleFeedbackMessage.bind(this)}>
                          {this.state.feedbackMessage}
                        </Alert>
                        </Col>
                      </Row>
                    </Form>
                </CardBody>
              </Collapse>
              <CardFooter>
                <Button color="primary" onClick={this.toggleFeedback} className={'mb-1'} id="toggleCollapse4">Click to Send a Feedback</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Stats {' & '} Figures
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="6">
                        <div className="callout callout-info">
                          <small className="text-muted">New Clients</small>
                          <br />
                          <strong className="h4">9,123</strong>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="callout callout-danger">
                          <small className="text-muted">Recurring Clients</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Monday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="34" />
                        <Progress className="progress-xs" color="danger" value="78" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Tuesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="56" />
                        <Progress className="progress-xs" color="danger" value="94" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Wednesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="12" />
                        <Progress className="progress-xs" color="danger" value="67" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Thursday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="43" />
                        <Progress className="progress-xs" color="danger" value="91" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Friday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="22" />
                        <Progress className="progress-xs" color="danger" value="73" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Saturday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="53" />
                        <Progress className="progress-xs" color="danger" value="82" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Sunday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="9" />
                        <Progress className="progress-xs" color="danger" value="69" />
                      </div>
                    </div>
                    <div className="legend text-center">
                      <small>
                        <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                        New clients
                        &nbsp;
                        <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                        Recurring clients
                      </small>
                    </div>
                  </Col>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="6">
                        <div className="callout callout-warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="callout callout-success">
                          <small className="text-muted">Organic</small>
                          <br />
                          <strong className="h4">49,123</strong>
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                    <ul>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-user progress-group-icon"></i>
                          <span className="title">Male</span>
                          <span className="ml-auto font-weight-bold">43%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="43" />
                        </div>
                      </div>
                      <div className="progress-group mb-5">
                        <div className="progress-group-header">
                          <i className="icon-user-female progress-group-icon"></i>
                          <span className="title">Female</span>
                          <span className="ml-auto font-weight-bold">37%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="37" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-globe progress-group-icon"></i>
                          <span className="title">Organic Search</span>
                          <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="56" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-facebook progress-group-icon"></i>
                          <span className="title">Facebook</span>
                          <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="15" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-twitter progress-group-icon"></i>
                          <span className="title">Twitter</span>
                          <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="11" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-linkedin progress-group-icon"></i>
                          <span className="title">LinkedIn</span>
                          <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="8" />
                        </div>
                      </div>
                      <div className="divider text-center">
                        <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="show more"><i className="icon-options"></i></Button>
                      </div>
                    </ul>
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;