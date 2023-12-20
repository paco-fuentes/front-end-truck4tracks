import React, { useState } from "react";

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
        <div>
            {messages && Array.isArray(messages) && messages.map((message, id) => (
                <div key={id}>
                    <div><img src={message.user.img_url} width="100" alt="Band Image" /></div>
                    <div>{message.user.username}</div>
                    <p>{message.message}</p>
                </div>
            ))}
            <input
                className={design}
                placeholder={placeholder}
                value={inputMessage}
                onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};
