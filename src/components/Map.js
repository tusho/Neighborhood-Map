import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import {Venues}  from './Venues'
import MenuBar from './Menu'
import { push as Menu } from 'react-burger-menu'

  export class MapContainer extends Component {

    constructor(props) {
      super(props);
      this.state = {
        displayedVenues: Venues,
        dropdownValue: 'selected'
      };
    }

    handleEvent  = (e) => {
      const selectedMarker = e.target.value
      console.log(this.dropdownValue)
      this.setState(prevState => ({
        displayedVenues: Venues.filter(venue => venue.category.toLowerCase() === selectedMarker),
        dropdownValue: selectedMarker
      }))
    }

    resetFilter  = () => {
      this.setState(prevState => ({
        displayedVenues: Venues,
        dropdownValue: 'selected'
      }))
    }

    render() {
      
      const {onClose, onMarkerClick, activeMarker, onListClick, showingInfoWindow, selectedVenue} = this.props

      return (
        <div id="map">
            <Menu noOverlay width={ '350px' }>
              <MenuBar displayedVenues={this.state.displayedVenues} handleEvent={this.handleEvent} resetFilter={this.resetFilter} dropdownValue={this.state.dropdownValue} onListClick={onListClick}/>
            </Menu>
            <Map 
                google={this.props.google} 
                initialCenter={{
                    lat: -33.870843,
                    lng: 151.209900
                    }}
                zoom={15}>
                {this.state.displayedVenues.map((venue) => (
                  <Marker
                  onClick={onMarkerClick}
                  key={venue.id}
                  name={venue.name}
                  position={venue.position}
                  latitude={venue.position.lng}
                  longitute={venue.position.lat}
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