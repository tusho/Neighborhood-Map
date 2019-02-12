import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import MenuBar from './Menu'
import { push as Menu } from 'react-burger-menu'

export class MapContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        displayedVenues: props.venues,
        dropdownValue: 'selected',
        showingInfoWindow: false
      };
    }

    handleEvent  = (e) => {
      const selectedMarker = e.target.value
      this.setState(prevState => ({
        displayedVenues: this.props.venues.filter(venue => venue.category.toLowerCase() === selectedMarker),
        dropdownValue: selectedMarker
      }))
    }

    resetFilter  = () => {
      this.setState(prevState => ({
        displayedVenues: this.props.venues,
        dropdownValue: 'selected'
      }))
    }

    render() {

      const {
        venues,
        initializeMap,
        activeMarker,
        onClose,
        onMarkerClick,
        showingInfoWindow,
        selectedVenue
      } = this.props

      return (
        <div id="map">
            <Menu noOverlay width={ '350px' }>
              <MenuBar
                displayedVenues={venues}
                handleEvent={this.handleEvent}
                resetFilter={this.resetFilter}
                dropdownValue={this.state.dropdownValue}
                onListClick={onMarkerClick}
              />
            </Menu>
            <Map
              google={this.props.google}
              initialCenter={{
                  lat: -33.870843,
                  lng: 151.209900
              }}
              zoom={15}
              onReady={initializeMap}>
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
