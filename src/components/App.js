import React, { Component } from 'react';
import MapContainer from './Map'
import { Venues } from './Venues';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVenue: {},
      showingInfoWindow: false,
      activeMarker: {},
      venues: [],
      markers: [],
      map: null
    };
  }

  initializeMap = (mapProps, map) => {
    const venues = Venues;
    const self = this

    const markers = venues.map(venue => {
      venue.marker = new window.google.maps.Marker({
          position: {lat: venue.position.lat, lng: venue.position.lng},
          map: map,
          title: venue.name,
          animation : window.google.maps.Animation.DROP
        });

      venue.marker.addListener('click', function() {

      self.onMarkerClick(venue);
      })
      return venue.marker
    });

    this.setState({
      map: map,
      venues: venues,
      markers: markers
    });
  }

  onMarkerClick  = (venue) => {
    const marker = this.state.markers.find(marker => marker.title === venue.name);
    marker.setAnimation(4);
    this.setState({
      showingInfoWindow: true,
      selectedVenue: venue,
      activeMarker: marker
    });
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
          initializeMap={this.initializeMap}
          venues={this.state.venues}
          onMarkerClick={this.onMarkerClick}
          onClose={this.onClose}
          showingInfoWindow={this.state.showingInfoWindow}
          selectedVenue={this.state.selectedVenue}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

export default App;
