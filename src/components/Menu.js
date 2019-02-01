import React from 'react'
import sortBy from 'sort-by'
import { Venues } from './Venues';

class MenuBar extends React.Component {

    

    render() {

    const {displayedVenues, handleEvent, resetFilter, onListClick, dropdownValue} = this.props
    
    let clearFilter
    displayedVenues.sort(sortBy('name'));

    if (displayedVenues.length !== Venues.length) { 
        clearFilter = <button className="clearFilter" onClick={resetFilter}>(Clear Filter)</button>
    }
        return (
            <div className="menuBar">
                <h2>Venue List</h2>
                <div className="venue-filter">
                    <select value={dropdownValue} className="filter-dropdown" onChange={(e) => handleEvent(e)}>
                        <option value="selected" disabled>Filter selection...</option>
                        <option value="bar">Bars</option>
                        <option value="cafe">Cafés</option>
                        <option value="restaurant">Restaurants</option>
                    </select>
                  </div>
                <p className="filterCopy">Showing {displayedVenues.length} of {Venues.length} locations. {clearFilter}</p>
                
                <ul className="venue-list">
                    {displayedVenues.map((venue) => (
                        <li className="venue-item" key={venue.name} onClick={(e) => onListClick(e, venue)}>{venue.name}</li>
                    ))}
                </ul>
            </div>
        )

    }

}

export default MenuBar;
