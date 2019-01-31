import React from 'react'
import sortBy from 'sort-by'

class MenuBar extends React.Component {

    

    render() {

    const {displayedVenues, handleEvent} = this.props

    displayedVenues.sort(sortBy('name'));

        return (
            <div className="menuBar">
                <h2>Venue List</h2>
                <div className="venue-filter">
                    <select className="filter-dropdown" onChange={(e) => handleEvent(e)}>
                        <option value="" selected="selected" disabled>Filter selection...</option>
                        <option value="bar">Bars</option>
                        <option value="cafe">Cafés</option>
                        <option value="restaurant">Restaurants</option>
                    </select>
                  </div>
                <ul className="venue-list">
                    {displayedVenues.map((venue) => (
                        <li className="venue-item" key={venue.name}>{venue.name}</li>
                    ))}
                </ul>
            </div>
        )

    }

}

export default MenuBar;
