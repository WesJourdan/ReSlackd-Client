import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import Header from './Header';
import MessageBoard from './MessageBoard';
import Channels from './Channels';
import Sidebar from 'react-sidebar';
import fontawesome, { library } from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(regular, solid)

const mediaQueryLimit = window.matchMedia(`(min-width: 800px`);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaQueryLimit,
      docked: props.docked,
      open: props.open
    }
  }


  onSetSidebarOpen = (open) => {
    this.setState({sidebarOpen: open});
  }

  toggleSidebar = () => {
    this.setState({sidebarDocked: !this.state.sidebarDocked})
  }

  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mediaQueryLimit.matches})
  }

  componentWillMount() {
    mediaQueryLimit.addListener(this.mediaQueryChanged);
    this.setState({mediaQueryLimit, sidebarDocked: mediaQueryLimit.matches})
  }

  componentWillUnmount() {
    this.state.mediaQueryLimit.removeListener(this.mediaQueryChanged);
  }

  render() {

    return (
      <div>
        <Header toggleSidebar={this.toggleSidebar} />
        <Sidebar
          sidebar={
            <div className='mx-3 mt-2'>
              <Channels messageType='channel' />
              <Channels messageType='DM' />
            </div>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          shadow={false}
          styles={{
            root: {
              top: '3.5rem'
            },
            sidebar: {
              backgroundColor: '#283e48'
            }
          }}
        >
          <MessageBoard />
        </Sidebar>
      </div>
    );
  }
}

export default connect(null, actions)(App);
