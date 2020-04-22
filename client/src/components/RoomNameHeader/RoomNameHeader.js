import React from 'react'
import onlineIcon from '../../Assets/onlineIcon.png';
import closeIcon from '../../Assets/closeIcon.png';
import './RoomNameHeader.css'

const RoomNameHeader = ({roomName}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>{roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close icon" /></a>
            </div>
        </div>
    )
}

export default RoomNameHeader
