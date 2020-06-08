import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

export const AppContext = React.createContext();


// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Landing = React.lazy(() => import('./views/Pages/Landing'));
const LoginCustomer = React.lazy(() => import('./views/Pages/LoginCustomer'));
const RegisterCustomer = React.lazy(() => import('./views/Pages/RegisterCustomer'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
//   constructor() {
//     super();
//     this.state = { 
//       username: '' 
//     };
// }
//   callbackFunction = (childUsername) => {
//       this.setState({username: childUsername});
//   }
  

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/landing" name="Landing Page" render={props => <Landing {...props}/>} />
              <Route exact path="/logincus" name="LoginCustomer Page" render={props => <LoginCustomer {...props}/>} />
              <Route exact path="/registercus" name="RegisterCustomer Page" render={props => <RegisterCustomer {...props}/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* <Login parentCallback = {this.callbackFunction} />
              <p>{this.state.username}</p> */}
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
