/*global google*/
import React, { Component } from 'react';
import MapContainer from './Map'
import { Venues } from './Venues';

class App extends Component {
  state={
    selectedVenue: this.props,
    showingInfoWindow: false,
    test: true,
    windowPosition: null,
    loc: null,
    activeMarker: null,
    venues: [],
    markers: []
  }

  fetchPlaces = (mapProps, map) => {
    const venues = Venues;
    const markers = venues.map(venue => {
      return {
        lat: venue.position.lat,
        lng: venue.position.lng,
        isOpen: false,
        isVisible: true,
        id: venue.id,
      };
    });
    this.setState({
      venues: venues,
      markers: markers
    });
    console.log("this.state.venues", this.state.venues);
    console.log("this.state.markers", this.state.markers);
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
    console.log(this.state.activeMarker)
    let markerLoc = { lat: venue.position.lat, lng: venue.position.lng }

    this.state.marker.setAnimation(4);

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
          activeMarker={this.state.activeMarker}
          fetchPlaces={this.fetchPlaces}/>
      </div>
    );
  }
}

export default App;
