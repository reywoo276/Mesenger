// src/Chat.js
import React, { useState } from "react";
import "./Chat.css";

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { sender: "Я", text: message }]);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">💬 Мессенджер</div>
                <div className="messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="message">
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="input-form">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        className="message-input"
                        required
                    />
                    <button type="submit" className="send-button">Отправить</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
