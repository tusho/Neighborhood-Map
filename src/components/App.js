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
      myTrial: []
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
      let trial = this.state.venues.map(myvenue => {
        let myVariable
        const endPoint = myvenue.foursquareID
        const parameters = {
          client_id: "V3WF0H0AMSYWU0PE441PJTNDJJBWMLMZIM4TTZ1W4QZHCHQM",
          client_secret: "VYL03E3TF244H02NY2WDNCGPEGRVOJRA1JICGYZ33ZFYAF2K",
          v: "20180323"
        }
  
        axios.get(endPoint + new URLSearchParams(parameters))
          .then(response => {
            console.log(response.data.response.venue.name)
            // this.setState(prevState => ({
            //   foursquareVenues: [...prevState.foursquareVenues, response.data.response.venue]
            // }))
            myVariable = response.data.response.venue.name
          })
          .catch(error => {
            console.log("Error." + error)
          })
          console.log(myVariable)


      })

      this.setState({
        myTrial: trial
      })
      

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
