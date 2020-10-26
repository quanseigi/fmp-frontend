import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './component/Home';
import ShareMovie from './component/ShareMovie';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/share' exact={true} component={ShareMovie}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
