import "./BandChat.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userTokenSlice";
import { jwtDecode } from "jwt-decode";

export const BandChat = ({ messages, design, placeholder, onSendMessage, onSendButtonClick }) => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    let currentUserId;
    if ((typeof token) !== "object") {
        const decToken = token ? jwtDecode(token) : null;
        currentUserId = decToken?.id;
    }

    const [inputMessage, setInputMessage] = useState('');
    const [hoveredMessageId, setHoveredMessageId] = useState(null);

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleUserMessageClick = (id) => {
        onSendButtonClick(id);
    };

    const handleMouseEnter = (id) => {
        setHoveredMessageId(id);
    };

    const handleMouseLeave = () => {
        setHoveredMessageId(null);
    };

    return (
        <div className="chatCard">
            <div className="messageContainer">
                {messages &&
                    Array.isArray(messages) &&
                    messages.slice().reverse().map((message, id) => (
                        <div
                            key={id}
                            className="message"
                            onMouseEnter={() => handleMouseEnter(message.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="userAndTxt">
                                <img src={`https://unavatar.io/${message.user.username}`} width="50" alt="user image" />
                                <div >
                                    <div className="username">{message.user.username}</div>
                                    <div className="txtMessage">{message.message}</div>
                                </div>
                            </div>
                            <div className="userMessage">
                                {(hoveredMessageId === message.id && currentUserId === message.user.id) && (
                                    <div className="delMessageButton" onClick={() => handleUserMessageClick(message.id)}>Delete</div>
                                )}
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
