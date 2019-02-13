import React from 'react'
import sortBy from 'sort-by'

class MenuBar extends React.Component {


  render() {

    const {displayedVenues, onListChange, resetFilter, onMarkerClick, dropdownValue} = this.props

    displayedVenues.sort(sortBy('name'));

    return (
      <div className="menuBar">
          <h2>Venue List</h2>
          <div className="venue-filter">
              <select value={dropdownValue} className="filter-dropdown" onChange={(e) => onListChange(e)}>
                  <option value="selected" disabled>Filter selection...</option>
                  <option value="bar">Bars</option>
                  <option value="cafe">Cafés</option>
                  <option value="restaurant">Restaurants</option>
              </select>
            </div>
          <p className="filterCopy" role="note">Showing {displayedVenues.length} of {this.props.venues.length} locations.</p>
          {displayedVenues.length !== this.props.venues.length ? <span className="clearFilter" tabIndex="0" aria-label="clear filter" onKeyPress={resetFilter} onClick={resetFilter}>(Clear Filter)</span> : null}

          <ul className="venue-list">
              {displayedVenues.map((venue) => (
                  <li className="venue-item" role="button" aria-label={venue.name} tabIndex="0" onKeyPress={(e) => onMarkerClick(venue)} key={venue.name} onClick={(e) => onMarkerClick(venue)}>{venue.name}</li>
              ))}
          </ul>
      </div>
    )
  }
}

export default MenuBar;
