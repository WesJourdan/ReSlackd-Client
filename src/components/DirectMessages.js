import React, { Component } from 'react';


class DirectMessages extends Component {
  
  /*  this class needs to map the messages array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action 
      passing in the channel ID.
  */
    render() {
        return (
          <div>
            DM
          </div>
        );
      }
}

export default DirectMessages;