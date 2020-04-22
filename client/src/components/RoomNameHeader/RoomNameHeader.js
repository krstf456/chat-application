import React from 'react'
import closeIcon from '../../Assets/closeIcon.png';

const RoomNameHeader = ({roomName}) => {
    return (
        <div>
            <div className="leftInnerContainer">
                <h3>{roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close icon" /></a>
            </div>
        </div>
    )
}

export default RoomNameHeader
