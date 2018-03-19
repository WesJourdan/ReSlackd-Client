import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        console.log(this.props.auth);
        
        switch (this.props.auth) {
          case null:
            return <li><a href="/auth/google">Login With Google</a></li>;
          case false:
            return <li><a href="/auth/google">Login With Google</a></li>;
          default:
          return [
            <li><a href="/api/logout">Logout</a></li>
          ];
        }
      }

    render() {
        return (
          <nav>
            <div className="nav-wrapper">
               <div className="left brand-logo">
                ReSlackd
                </div>
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
      }
    }
    
function mapStateToProps({ auth }) {
    return { auth };
}
    
export default connect(mapStateToProps)(Header);