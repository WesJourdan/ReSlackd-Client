import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './Header';
import MessageBoard from './MessageBoard';
import Channels from './Channels';

  

class App extends Component {
 
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" />
            <Route exact path="/Messages" component={MessageBoard} />
            <Route path="/Channels" component={Channels} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);







