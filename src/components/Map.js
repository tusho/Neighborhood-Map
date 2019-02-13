import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import MenuBar from './Menu'
import { push as Menu } from 'react-burger-menu'



export class MapContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownValue: 'selected',
        showingInfoWindow: false
      };
    }



    onListChange  = (e) => {
      const selectedCategory = e.target.value
      const updatedVenues = this.props.venues.filter(venue => venue.category.toLowerCase() === selectedCategory);
      this.setState({
        displayedVenues: updatedVenues,
        dropdownValue: selectedCategory
      })
      this.props.onClose()
    }
  
    resetFilter  = () => {
      this.setState(prevState => ({
        displayedVenues: this.props.venues,
        dropdownValue: 'selected'
      }))
      this.props.onClose()
    }



    render() {
      
      const {
        initializeMap,
        activeMarker,
        onClose,
        onMarkerClick,
        showingInfoWindow,
        selectedVenue,
        foursquareselect
      } = this.props

      
      let displayedVenues = this.props.venues.filter(venue => {
        const category = venue.category.toLowerCase();
        const dropdown = this.state.dropdownValue;
  
        if (category.includes(dropdown) || this.state.dropdownValue === 'selected') {
            venue.marker.setVisible(true);
            return venue;
        } else {
          if (venue.marker) {
            venue.marker.setVisible(false);
          }
        }
        return null;
      })
  

      return (
        <div id="map" role="application" aria-label="Map of inner Sydney">
            <Menu noOverlay width={ '350px' }>
              <MenuBar
                displayedVenues={displayedVenues}
                onListChange={this.onListChange}
                resetFilter={this.resetFilter}
                dropdownValue={this.state.dropdownValue}
                onMarkerClick={onMarkerClick}
                venues={this.props.venues}
              />
            </Menu>
            <Map
              google={this.props.google}
              initialCenter={{
                  lat: -33.8647642,
                  lng: 151.2114794
              }}
              zoom={15}
              onReady={initializeMap}>
              <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}
                onClose={onClose}
              >
                <div className="info-box">
                  <h4 className="info-headline">{selectedVenue.name}</h4>
                  <div className="venue-image" style={{ backgroundImage: "url(" + selectedVenue.image + ")"}} title={selectedVenue.name}></div>
                  <ul>
                    <li>Address: {selectedVenue.address}</li>
                    <li>Category: {selectedVenue.category}</li>
                    {this.props.foursquareVenues.length === 0 ? <p className="disclaimer">No Foursquare Data Available</p> : <li>Rating: {foursquareselect.rating} <span className="disclaimer"> (Powered by Foursquare)</span></li> }
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
