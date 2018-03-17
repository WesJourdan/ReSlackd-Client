import React, { Component } from 'react';
import ChannelSettings from './ChannelSettings';

class Channels extends Component {

  /*  this class needs to map the channels array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action 
      passing in the channel ID.
  */

    render() {
        return (
          <div>Channels
            <ChannelSettings />
          </div>
        );
      }

}

export default Channels;