import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './Header';
import MessageBoard from './MessageBoard';
import DirectMessages from './DirectMessages'
import Channels from './Channels';



class App extends Component {

  render() {
    return (
      <div className="">
            <Header />
            <Channels />
            <DirectMessages />
            <MessageBoard />
      </div>
    );
  }
}

export default connect(null, actions)(App);
