import React from 'react'
import './DisplayUsers.css'

const DisplayUsers = ({ users }) => {

    return (
        <div className="textContainer">
            {
                users
                    ? (
                        <div>
                            <h1>Chatting with you:</h1>
                            <div className="activeContainer">
                                <h2>
                                    {users.map(({ name }) => (
                                        <div key={name} className="activeItem">
                                            {name}
                                        </div>
                                    ))}
                                </h2>
                            </div>
                        </div>
                    )
                    : null
            }

        </div>
    )
}

export default DisplayUsers
