import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8090';

export const useSocket = (userId: number) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:8090', {
      transports: ['websocket', 'polling'], // Ensure proper transport
    });

    // newSocket.on('connect', () => {
    //   console.log('Connected to the server:', newSocket.id);
    // });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from the server');
    // });
    // newSocket.emit('join', userId);
    // setSocket(newSocket);

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socket;
};
