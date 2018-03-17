import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './Header';
import MessageBar from './MessageBar';
//import MessageBoard from './MessageBoard';

const Channels = () => <h2>Channels</h2>;
const ChannelSettings = () => <h2>ChannelSettings</h2>;
const DirectMessages = () => <h2>DirectMessages</h2>;
const MessageBoard = () => <h2>MessageBoard</h2>;

class App extends Component {
 
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" />
            <Route exact path="/Messages" component={MessageBoard} />
            <Route path="/Channels/new" component={Channels} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);







