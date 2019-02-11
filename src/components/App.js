/*global google*/
import React, { Component } from 'react';
import MapContainer from './Map'

class App extends Component {
  state={
    selectedVenue: this.props,
    showingInfoWindow: false,
    test: true,
    windowPosition: null,
    loc: null,
    activeMarker: null
  }

  toggleInfoWindow = (props, marker, loc) => {
    console.log(marker)
 
    if (loc == null) {
      this.setState({ windowPosition: null })
      return
    }

    let markerLoc = { lat: loc.latLng.lat(), lng: loc.latLng.lng() }

    marker.setAnimation(4);

    this.setState({
      loc: loc,
      windowPosition: markerLoc,
      selectedVenue: props,
      showingInfoWindow: true,
      activeMarker: marker
    })
  }

  onListClick  = (e, venue) => {
    let markerLoc = { lat: venue.position.lat, lng: venue.position.lng }

    this.state.activeMarker.setAnimation(4);

    this.setState({
      showingInfoWindow: true,
      selectedVenue: venue,
      windowPosition: markerLoc
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  render() {
    return (
      <div className="App">

        <MapContainer
          toggleInfoWindow={this.toggleInfoWindow}
          onListClick={this.onListClick}
          onClose={this.onClose}
          windowPosition={this.state.windowPosition}
          showingInfoWindow={this.state.showingInfoWindow}
          selectedVenue={this.state.selectedVenue}
          filterMarkers={this.filterMarkers}
          activeMarker={this.state.activeMarker}/>
      </div>
    );
  }
}

export default App;
