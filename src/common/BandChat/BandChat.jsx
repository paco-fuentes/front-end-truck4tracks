import "./BandChat.css";

export const BandChat = ({ id, messages }) => {

    return (
        <div key={id}>
            {messages && Array.isArray(messages) && messages.map((message, id) => (
                <div key={id}>
                    <div><img src={message.user.img_url} width="100" alt="Band Image" /></div>
                    <div>{message.user.username}</div>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};
