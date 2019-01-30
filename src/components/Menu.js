import React from 'react'
import sortBy from 'sort-by'

class MenuBar extends React.Component {

    

    render() {

    const {markerObjects} = this.props

    markerObjects.sort(sortBy('name'));

        return (
            <div className="menuBar">
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
