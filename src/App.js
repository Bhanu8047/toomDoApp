import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
import AuthContext from './store/auth-context';
import Home from './components/Home/Home';

function App() {

  const ctx = useContext(AuthContext)
  return (
    <Router>
      <div className="container">
        <MainHeader />
          {!ctx.isLoggedIn && <Redirect to='/login'/>}
          {!ctx.isLoggedIn && 
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
          </Switch>
          }
        <main>
          {ctx.isLoggedIn && <Redirect to='/'/>}
          {ctx.isLoggedIn && <Home />}
        </main>
      </div>
    </Router>
  );
}

export default App;
