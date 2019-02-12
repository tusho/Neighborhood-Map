import React, { Component } from 'react'
import MapContainer from './Map'
import { Venues } from './Venues'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVenue: {},
      showingInfoWindow: false,
      activeMarker: {},
      venues: [],
      markers: [],
      map: null,
      foursquareVenues: [],
      foursquareselect: {}
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
          animation : window.google.maps.Animation.DROP,
          category: venue.category
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

    this.getVenues()

  }

  getVenues = () => {
    console.log(this.state.forsquareVenues)
      // eslint-disable-next-line no-lone-blocks
      {this.state.venues.map(myvenue => {
        const endPoint = myvenue.foursquareID
        const parameters = {
          client_id: "IPG0YRDNZG3VCUSCGQRUCFRFVWD5F5E1YT5D5LPKMWPARPRJ",
          client_secret: "LXXG2QMZA0D1NC1H2AOBHTYTPOS0PRGW5QDJFZTA31JTP1A4",
          v: "20180323"
        }
  
        axios.get(endPoint + new URLSearchParams(parameters))
          .then(response => {
            this.setState(prevState => ({
              foursquareVenues: [...prevState.foursquareVenues, response.data.response.venue]
            }))
          })
          .catch(error => {
            alert("Foursquare API Error:" + error)
          })

        })
      }
  }

  onMarkerClick  = (venue) => {
    const marker = this.state.markers.find(marker => marker.title === venue.name);
    const foursquareselect = this.state.foursquareVenues.find(foursquarevenue => foursquarevenue.name === venue.name)
    marker.setAnimation(4);
    this.setState({
      showingInfoWindow: true,
      selectedVenue: venue,
      activeMarker: marker,
      foursquareselect: foursquareselect
    });
    console.log(foursquareselect.bestPhoto.suffix)
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
          foursquareVenues={this.state.foursquareVenues}
          foursquareselect={this.state.foursquareselect}
        />
      </div>
    );
  }
}

export default App;
