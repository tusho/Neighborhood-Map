import React, { Component } from 'react';
import Menu from './Menu'
import MapContainer from './Map'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <MapContainer />
      </div>
    );
  }
}

export default App;
