'use client';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    socket = io('http://localhost:8090');

    // Listen for incoming messages
    socket.on('message', (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message); // Send message to server
      setMessage('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Socket.IO Chat</h1>
      <div
        style={{
          border: '1px solid black',
          padding: 10,
          height: 300,
          overflowY: 'scroll',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ padding: 5, width: '80%' }}
        />
        <button onClick={sendMessage} style={{ padding: 5, marginLeft: 5 }}>
          Send
        </button>
      </div>
    </div>
  );
}
