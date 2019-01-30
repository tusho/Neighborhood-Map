import React from 'react'

class MenuBar extends React.Component {

    

    render() {

    const {markerObjects} = this.props

        return (
            <div className="menuBar">
                <ul>
                    {markerObjects.map((markerobject) => (
                        <li key={markerobject.name}>{markerobject.name}</li>
                    ))}
                </ul>
            </div>
        )

    }

}

export default MenuBar;
