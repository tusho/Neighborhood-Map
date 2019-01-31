import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import {Venues}  from './Venues'
import MenuBar from './Menu'
import { push as Menu } from 'react-burger-menu'

  export class MapContainer extends Component {

    constructor(props) {
      super(props);
      this.state = {
        markerObjects: []
      };
  
      this.onMarkerMounted = element => {
        this.setState(prevState => ({
          markerObjects: [...prevState.markerObjects, element.marker]
        }))
      };
    }

    handleEvent  = (e) => {
      const selectedMarker = e.target.value
      console.log(this.state.markerObjects[0].category.toLowerCase() + selectedMarker)
      this.setState(prevState => ({
        markerObjects: this.state.markerObjects.filter(markerobject => markerobject.category.toLowerCase() == selectedMarker)
      }))
    }

    render() {
      
      
      const {onClose, onMarkerClick, activeMarker, showingInfoWindow, selectedVenue} = this.props

      return (
        <div id="map">
            <Menu noOverlay width={ '320px' }>
              <MenuBar markerObjects={this.state.markerObjects} handleEvent={this.handleEvent}/>
            </Menu>
            <Map 
                google={this.props.google} 
                initialCenter={{
                    lat: -33.870843,
                    lng: 151.209900
                    }}
                zoom={15}>
                {Venues.map((venue) => (
                  <Marker
                  onClick={onMarkerClick}
                  ref={this.onMarkerMounted}
                  key={venue.id}
                  name={venue.name}
                  position={venue.position} 
                  category={venue.category}
                  image={venue.image}
                  address={venue.address}
                  />
                ))}
                <InfoWindow
                  marker={activeMarker}
                  visible={showingInfoWindow}
                  onClose={onClose}
                >
                  <div>
                    <h4>{selectedVenue.name}</h4>
                    <div className="venue-image" style={{ width: 200, height: 200, backgroundImage: `url(${selectedVenue.image})` }}></div>
                    <ul>
                      <li>Address: {selectedVenue.address}</li>
                      <li>Category: {selectedVenue.category}</li>
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