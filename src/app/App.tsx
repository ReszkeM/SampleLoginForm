import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './home/containers/home';
import Login from './login/containers/login';

import './App.sass';

class App extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <Router>
        <div className="container">
          <ul className="header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <div className="body">
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
