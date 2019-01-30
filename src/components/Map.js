import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import {Venues}  from './Venues'

  export class MapContainer extends Component {
   
    state = {
      selectedVenue: this.props,
      activeMarker: this.marker,
      showingInfoWindow: true
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

      console.log(this.props)

      return (
        <div id="map">
            <Map 
                google={this.props.google} 
                initialCenter={{
                    lat: -33.870843,
                    lng: 151.209900
                    }}
                zoom={15}>
                {Venues.map((venue) => (
                  <Marker
                  onClick={this.onMarkerClick}
                  key={venue.name}
                  name={venue.name}
                  position={venue.position} 
                  category={venue.category}
                  image={venue.image}
                  address={venue.address}
                  />
                ))}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedVenue.name}</h4>
                    <div className="venue-image" style={{ width: 200, height: 200, backgroundImage: `url(${this.state.selectedVenue.image})` }}></div>
                    <ul>
                      <li>Address: {this.state.selectedVenue.address}</li>
                      <li>Category: {this.state.selectedVenue.category}</li>
                    </ul>
                  </div>
                </InfoWindow>
            </Map>
        </div>
     );
     }
    }
    export default GoogleApiWrapper({
      apiKey: 'AIzaSyDnxGPABlrgmJfAclOPPBROjwbs46tHFPg'
    })(MapContainer)