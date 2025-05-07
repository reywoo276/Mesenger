import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import "./Chat.css";

function Chat() {
    const [myId, setMyId] = useState(null);
    const [myName, setMyName] = useState("");
    const [recipientId, setRecipientId] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);

    const clientRef = useRef(null);
    const recipientIdRef = useRef("");

    const getToken = () => {
        const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
        return match ? match[2] : null;
    };

    useEffect(() => {
        const token = getToken();
        if (!token) {
            alert("Токен отсутствует. Перезайдите.");
            window.location.href = "/";
            return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        const username = decoded.username;

        setMyId(userId);
        setMyName(username);

        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            reconnectDelay: 3000,
            onConnect: () => {
                setConnected(true);
                console.log("✅ WebSocket подключен");

                client.subscribe(`/user/${userId}/queue/messages`, (message) => {
                    const msg = JSON.parse(message.body);
                    if (recipientIdRef.current === msg.senderId) {
                        setMessages((prev) => [...prev, {
                            sender: msg.senderName,
                            text: msg.content,
                            timestamp: msg.timestamp,
                        }]);
                    } else {
                        console.log("📨 Новое сообщение от:", msg.senderName);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("STOMP ошибка:", frame);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken();
                const res = await fetch("/users/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const users = await res.json();
                setAllUsers(users.filter((u) => u.id !== myId));
            } catch (err) {
                console.error("Ошибка при получении пользователей:", err);
            }
        };

        if (myId) fetchUsers();
    }, [myId]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = getToken();
                const res = await fetch(`/messages/${myId}/${recipientId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setMessages(data.map((msg) => ({
                    sender: msg.senderName,
                    text: msg.content,
                    timestamp: msg.timestamp,
                })));
            } catch (err) {
                console.error("Ошибка при загрузке сообщений:", err);
            }
        };

        if (recipientId && myId) {
            fetchMessages();
        }
    }, [recipientId, myId]);

    const handleSend = (e) => {
        e.preventDefault();
        const client = clientRef.current;
        if (!message.trim() || !recipientId || !client || !client.connected) return;

        const recipientUser = allUsers.find((u) => u.id === recipientId);

        const payload = {
            senderId: myId,
            recipientId,
            senderName: myName,
            recipientName: recipientUser?.username || "Пользователь",
            content: message,
            timestamp: new Date().toISOString(),
        };

        client.publish({
            destination: "/app/chat",
            body: JSON.stringify(payload),
        });

        setMessages((prev) => [...prev, {
            sender: "Я",
            text: message,
            timestamp: new Date().toLocaleString(),
        }]);
        setMessage("");
    };

    const handleRecipientChange = (e) => {
        const value = e.target.value;
        recipientIdRef.current = value;
        setRecipientId(value);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">
                    💬 Чат | Статус: {connected ? "🟢 Подключено" : "🔴 Отключено"}
                </div>
                <div className="chat-select">
                    <select onChange={handleRecipientChange} value={recipientId}>
                        <option value="">-- Выберите получателя --</option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="message">
                            <strong>{msg.sender}:</strong> {msg.text}
                            <div className="timestamp">{msg.timestamp}</div>
                        </div>
                    ))}
                </div>
                <form className="input-form" onSubmit={handleSend}>
                    <input
                        className="message-input"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                    />
                    <button className="send-button" type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
