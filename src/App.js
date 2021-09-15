import './App.css';
import React from 'react';
// import CounterContainer from "./counter/CounterContainer";
// import UserServices from "./services/UserServices";
import UserContainer from "./user/UserContainer";
import DashboardComponent from './dashboard/DashboardComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import HeaderComponent from './shared/components/header/HeaderComponent';
import NotFoundComponent from './shared/components/not-found/NotFoundComponent';
import FormUserComponent from './user/FormUserComponent';

// const userService = new UserServices();
class App extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     title: 'Hello World',
  //     data: [],
  //     loading: false
  //   }
  // }

  // handleChangeTitle = () => {
  //   this.setState({
  //     title: 'Hello World with class component'
  //   })
  // }

  render() {
    return (
      <ProvideAuth>
        <Router>
          <div>
            <HeaderComponent authButton={<AuthButton/>}/>
            <Switch>
              <PrivateRoute path="/users">
                  <UserContainer />
              </PrivateRoute>
              <Route path="/dashboard">
                <DashboardComponent />
              </Route>
              <PrivateRoute path="/form-user">
                <FormUserComponent />
              </PrivateRoute>
              <Route exact path="/home">
                <div>
                  <h1>Belajar react react router nih</h1>
                </div>
              </Route>
              <Route path='/login'>
                <LoginPage/>
              </Route>
              <Route path="*">
                <NotFoundComponent />
              </Route>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    );
  }
}


// create fake auth
const fakeAuth = {
  isAuthenticated: false,
  signIn(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100)
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

//use auth context to provide routing with auth
const authContext = React.createContext();

// use auth
const useAuth = () => {
  return React.useContext(authContext);
}

//create function ProvideAuth
const useProvideAuth = () => {
  const [user, setUser] = React.useState(null);

  const signIn = (cb) => {
    return fakeAuth.signIn(() => {
      setUser('user');
      cb();
    })
  }

  const signOut = (cb) => {
    return fakeAuth.signIn(() => {
      setUser(null);
      cb();
    })
  }

  return {
    user,
    signIn,
    signOut,
  }
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route {...rest} render={({ location }) => auth.user ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
    } />
  )
}

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };

  const login = () => {
    auth.signIn(() => {
      history.replace(from);
    });
  }

  return (
    <div>
      <p>You must login to view the page at</p>
      <button type="button" onClick={login} className="btn btn-primary">Login</button>
    </div>
  )
}

const AuthButton = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };

  const login = () => {
    auth.signIn(() => {
      history.replace(from);
    });
  }

  return auth.user ? (
    <button type="button" className="btn btn-warning" onClick={() => {
      auth.signOut(() => history.push("/login"))
    }}>Sign Out</button>
  ) : (
    <button type="button" className="btn btn-primary" onClick={login}>Login</button>
  )
}

export default App;
