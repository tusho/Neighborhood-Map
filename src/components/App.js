import React, { Component } from 'react';
import MapContainer from './Map'





class App extends Component {

  state={
  activeMarker: this.marker,
  selectedVenue: this.props,
  showingInfoWindow: false
  }


  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedVenue: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };



  render() {
    return (
      <div className="App">

        <MapContainer onMarkerClick={this.onMarkerClick} onClose={this.onClose} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} selectedVenue={this.state.selectedVenue}/>
      </div>
    );
  }
}

export default App;
