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
    activeMarker: {},
    venues: [],
    markers: [],
    map: null
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
      map: map,
      venues: venues,
      markers: markers
    });
  }

  toggleInfoWindow = (props, marker, loc) => {

    marker.isOpen = true;
    this.setState({
      markers: Object.assign(this.state.markers, marker)
    });

    const venue = this.state.venues.find(venue => venue.name === props.name);

    marker.setAnimation(4);

    this.setState({
      selectedVenue: venue,
      showingInfoWindow: true,
      activeMarker: marker
    })
  }

  handleMarkerClick = (marker, venue) => {
    const newMarker = new google.maps.Marker({
      map: this.state.map,
      draggable: true,
      isVisible: false,
      isOpen: false,
      position: {lat: marker.lat, lng: marker.lng},
      animation: 4
    });

    this.state.markers.push(newMarker);

    this.setState({
      showingInfoWindow: true,
      selectedVenue: venue,
      activeMarker: newMarker
    });

  };


  onListClick  = (venue) => {

    const marker = this.state.markers.find(marker => marker.id === venue.id);

    this.handleMarkerClick(marker, venue);

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
          venues={this.state.venues}
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
