import React from 'react';
import './Network.css';
import Header from './Header';
import Connections from './Connections';
import Suggestions from './Suggestions';
import Groups from './Groups';
import Invitations from './Invitations';

const Network = () => {
  return (
    <div className="network-container">
      <Header />
      <div className="network-content">
        <div className="left-column">
          <Connections />
          <Suggestions />
        </div>
        <div className="right-column">
          <Groups />
          <Invitations />
        </div>
      </div>
    </div>
  );
};

export default Network;

