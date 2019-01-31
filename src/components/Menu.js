import React from 'react'
import sortBy from 'sort-by'

class MenuBar extends React.Component {

    

    render() {

    const {markerObjects, handleEvent} = this.props

    markerObjects.sort(sortBy('name'));

        return (
            <div className="menuBar">
                <h2>Venue List</h2>
                <div className="venue-filter">
                    <select className="filter-dropdown" onChange={(e) => handleEvent(e)}>
                        <option value="" disabled selected>Filter selection...</option>
                        <option value="bar">Bars</option>
                        <option value="cafe">Cafés</option>
                        <option value="restaurant">Restaurants</option>
                    </select>
                  </div>
                <ul className="venue-list">
                    {markerObjects.map((markerobject) => (
                        <li className="venue-item" key={markerobject.name}>{markerobject.name}</li>
                    ))}
                </ul>
            </div>
        )

    }

}

export default MenuBar;
