import React, { Component } from 'react';
import MapContainer from './Map'





class App extends Component {

  state={
  activeMarker: this.marker,
  selectedVenue: this.props,
  showingInfoWindow: false,
  test: true
  }


  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedVenue: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onListClick  = (e, venue, marker) => {
    console.log(venue)
    this.setState({
      showingInfoWindow: true,
      selectedVenue: venue,
      activeMarker: e.target.value
    })
  }

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

        <MapContainer onMarkerClick={this.onMarkerClick} onListClick={this.onListClick} onClose={this.onClose} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} selectedVenue={this.state.selectedVenue} filterMarkers={this.filterMarkers}/>
      </div>
    );
  }
}

export default App;
