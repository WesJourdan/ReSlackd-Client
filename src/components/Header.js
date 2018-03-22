import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import { bindActionCreators } from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchCurrentUser().then(res => {
    })
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return <a className='Header-login' href='/auth/google'>Login</a>;
      case false:
        return <a className='Header-login' href='/auth/google'>Login</a>;
      default:
        return (
        <a className='Header-login' href='/api/logout'>Logout</a>
      )
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='Header-bar row text-center'>
          <div className='col-3 py-3 cursor-pointer'><FontAwesomeIcon icon='bars' color='#283e48' size='lg' onClick={this.props.toggleSidebar} /></div>
          <div className='col-6 mt-2 Header-bar-brand'>ReSlackd</div>
          <div className='col-3 py-3'>{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
