import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { fetchChannels } from '../actions/index';
import './App.css';

class Modal extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          name: '',
          purpose: '',
          members: ''
        }
        
        //apparently none of this works yet, so I will keep working on it until its fix, 
        //but at least you can see what I have working thus far.
        
        // this.handleNameChange = this.handleNameChange.bind(this);
        // this.handlePurposeChange = this.handlePurposeChange.bind(this);
        // this.handleMembersChange = this.handleMembersChange.bind(this);
    }

    // handleDietChange(event) {
    //     this.setState({name: event.target.value});
    // }
    // handleExcludeChange(event) {
    //     console.log(event.target.value);
    //     this.setState({purpose: event.target.value});
    // }
    // handleCaloriesChange(event) {
    //     this.setState({members: event.target.value});
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.fetchChannels(this.state).then(()=>this.props.history.push("/Channels"))
    // }
    
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
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        return (
        <div className="backdrop" style={backdropStyle}>
            <div className="modal" style={modalStyle}>
                {this.props.children}
                <h6>Channels are where your members communicate. They're best when organized around a topic - #general, #random, for example. </h6>
            <form >
                <div className="form-group row">
                    <label className="col-2 col-form-label">Name:</label>
                        <div className="col-12">
                            <input type="text" placeholder="# e.g. general" className="name" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                    <label className="col-2 col-form-label">Purpose:</label>
                        <div className="col-12">
                            <input type="text" placeholder="What the channel is about" className="purpose" value={this.state.purpose} onChange={this.handlePurposeChange} />
                        </div>
                    <label className="col-2 col-form-label">Add members:</label>
                        <div className="col-12">
                            <select className="form-control mt-3 mb-2" value={this.state.members} onChange={this.handleMembersChange}>
                                <option className="members" value="none">None</option>
                                <option className="members" value="wes">Wes</option>
                            </select>
                        </div>
                </div>
            </form>
            <div className="footer">
                <button className="" onClick={this.props.onClose}>
                    Cancel
                </button>
                <button className="" onClick={this.props.onClose}>
                    Create Channel
                </button>
            </div>
            </div>
        </div>
        );
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
