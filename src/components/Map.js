import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, mapTypeControlOptions} from 'google-maps-react';
import {Venues}  from './Venues'

  export class MapContainer extends Component {
   
    state = {
      mapTypeControlOptions: false,
    }

    render() {

      console.log(Venues)

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
                  name={venue.name}
                  position={venue.position} 
                  />
                ))}
            </Map>

        </div>
     );
     }
    }
    export default GoogleApiWrapper({
      apiKey: 'AIzaSyDnxGPABlrgmJfAclOPPBROjwbs46tHFPg'
    })(MapContainer)