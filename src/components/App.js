import React, { Component } from 'react';
import MenuBar from './Menu'
import MapContainer from './Map'
import { slide as Menu } from 'react-burger-menu'




class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu>
          <MenuBar />
        </Menu>
        <MapContainer />
      </div>
    );
  }
}

export default App;
