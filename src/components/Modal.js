import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { fetchChannels } from '../actions/index';
import './App.css';
import Channels from './Channels';
const DUMMY = require('../DUMMY_DATA');

class Modal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            purpose: '',
            members: '',
            memberslist: [],
            // formErrors: {name: '', members: ''},
            // nameValid: false,
            // membersValid: false,
            // formValid: false
        }
        
        // apparently none of this works yet, so I will keep working on it until its fix, 
        // but at least you can see what I have working thus far.

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleMembersChange = this.handleMembersChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handlePurposeChange(event) {
        console.log(event.target.value);
        this.setState({purpose: event.target.value});
    }

    handleMembersChange(event) {
    //     this.setState({members: event.target.value});
    //     componentDidUpdate(this.props, this.state.members) {
    //         this.state.memberslist.map(username => {
    //             if (this.state.members !== username.username) {
    //                 this.setState({memberslist: this.state.memberslist.concat(this.state.members)});
    //             } else {

    //             };
    //         });
    //     };
     };

    //prevents calling onClose when clicking on the inner modal box.
    handleOnClick(event) {
        event.stopPropagation();
    }
    handleSubmit(event) {
        event.preventDefault();
        //this.props.fetchChannels(this.state).then(()=>this.props.history.push("/Channels"))
    }
    
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 800,
            minHeight: 500,
            margin: '0 auto',
            padding: 30
        };

        //TODO: need to find a way to know if this is called form channels component or DM.
        if(Channels) {
            return (
                <div className="backdrop" style={backdropStyle} onClick={this.props.onClose}>
                    <div className="modal" style={modalStyle} onClick={this.handleOnClick}>
                        {this.props.children}
                        <h2>Create a channel </h2>
                        <h4>Channels are where your members communicate. They're best when organized around a topic - #general or #random, for example. </h4>
                    <form >
                        <div className="form-group row">
                            <label className="col-2 col-form-label">Name:
                                <div className="col-10">
                                    <input type="text" placeholder="# e.g. general" className="name" value={this.state.name} onChange={this.handleNameChange} />
                                </div>
                            </label>
                            <label className="col-2 col-form-label">Purpose:</label>
                                <div className="col-12">
                                    <input type="text" placeholder="What the channel is about" className="purpose" value={this.state.purpose} onChange={this.handlePurposeChange} />
                                </div>
                            <label className="col-2 col-form-label">Add members:</label>
                                <div className="col-12">
                                    <select className="form-control mt-3 mb-2" value={this.state.members} onChange={this.handleMembersChange}>
                                        <option className="members" value="none">None</option>
                                        {
                                            DUMMY.MESSAGES.map( message => {
                                                let newMember = (
                                                    <option className="members" value={message.username}>{message.username}</option>
                                                )
    
                                                return newMember
                                            })
                                        }
                                    </select>
                                </div>
                        </div>
                    </form>
                    <div className="footer">
                        <button className="" onClick={this.props.onClose}>
                            Cancel
                        </button>
                        <button className="" onClick={this.handleSubmit}>
                            Create Channel
                        </button>
                    </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="backdrop" style={backdropStyle} onClick={this.handleOnClick}>
                    <div className="modal" style={modalStyle} onClick={this.handleOnClick}>
                        {this.props.children}
                        <h2>Direct Messages </h2>
                        <h6>Select a member to begin a direct message with. </h6>
                    <form >
                        <div className="form-group row">
                            <label className="col-2 col-form-label">Add members:</label>
                                <div className="col-12">
                                    <select className="form-control mt-3 mb-2" value={this.state.members} onChange={this.handleMembersChange}>
                                        <option className="members" value="none">None</option>
                                        {
                                            DUMMY.MESSAGES.map( message => {
                                                let newMember = (
                                                    <option className="members" value={message.username}>{message.username}</option>
                                                )
    
                                                return newMember
                                            })
                                        }
                                    </select>
                                </div>
                        </div>
                    </form>
                    <div className="footer">
                        <button className="" onClick={this.props.onClose}>
                            Cancel
                        </button>
                        <button className="" onClick={this.handleSubmit}>
                            Go
                        </button>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

function mapStateToProps(channels) {
    return { channels };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchChannels }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
