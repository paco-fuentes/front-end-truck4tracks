import React, { useState } from "react";
import "./BandChat.css"

export const BandChat = ({ messages, design, placeholder, onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="chatCard">
            <div className="messageContainer">
                {messages && Array.isArray(messages) && messages.map((message, id) => (
                    <div key={id} className="message">
                        <div><img src={message.user.img_url} width="50" alt="Band Image" /></div>
                        <div className="userMessage">
                            <div className="username">{message.user.username}</div>
                            <div>{message.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="buttonInput">
                <input
                    className="messageInput"
                    placeholder={placeholder}
                    value={inputMessage}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );

};
