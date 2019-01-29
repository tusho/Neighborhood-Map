import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Venues}  from './Venues'

  export class MapContainer extends Component {
   

    render() {
      return (
        <div id="map">
            <Map 
                google={this.props.google} 
                initialCenter={{
                    lat: -33.870843,
                    lng: 151.209900
                    }}
                zoom={15}>
                 <Marker
    name={Venues.name}
    position={Venues.position} />
            </Map>
        </div>
     );
     }
    }
    export default GoogleApiWrapper({
      apiKey: 'AIzaSyDnxGPABlrgmJfAclOPPBROjwbs46tHFPg'
    })(MapContainer)