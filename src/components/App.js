import React, { Component } from 'react';
import Menu from './Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
