'use client';
import { ChatView } from '@/app/_components/chat_view';
import LoaderComponent from '@/components/LoaderComponent';
import { IChat, IMessage } from '@/interface/IChat';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Hook to get window size
function useWindowSize() {
  const [size, setSize] = useState([1024, 768]); // Default to common screen dimensions
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}
const ChatViewContainer = () => {
  // const socket = useSocket(Number(1));
  const [isExpanded, setIsExpanded] = useState(true);
  const [width] = useWindowSize();
  const [imageWidth, setImageWidth] = useState(Number);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userChats, setUserChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const searchParams = useSearchParams();
  const [socket, setSocket] = useState<Socket | null>(null);


  // Update expanded state based on screen size
  useEffect(() => {
    if (width !== 0) {
      // Avoid calculating based on initial default values
      setImageWidth(width * 0.8);
      setIsExpanded(width >= 1024); // Expands at lg breakpoint (1024px)
    }
  }, [width]);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      await createChat();
      setIsLoading(false);
    };

    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:8090', {
      transports: ['websocket', 'polling'], // Ensure proper transport
    });

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
    newSocket.emit('join', selectedChat);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) return;
  
    const handleMessage = (message: IMessage) => {
      console.log('Message received:', message);
      if(message.userId!=Number(localStorage.getItem("userId")))
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };
  
    socket.on('receiveMessage', handleMessage);
  
    // Cleanup
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [socket]);

  const createChat = async () => {
    const url = API_ENDPOINTS.chat.createChat();
    const productUuid = localStorage.getItem('productId') || searchParams.get("productId");
    const config = {
      method: 'post',
      url: url,
      data: { productId: productUuid },
    };
    try {
      // setIsLoading(true);
      const responseData: { data: IChat } = await makeRequest(config);
      if (responseData) {
        
        let chatUuid = responseData.data.id;
        if(Array.isArray(responseData.data))
          chatUuid = responseData.data[0].id;
        await getChats(chatUuid);
        setSelectedChat(chatUuid);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const getChats = async (chatUuid: string) => {
    const url = API_ENDPOINTS.chat.getChats();
    const config = {
      method: 'get',
      url: url,
      params: searchParams.get("productId") ? { query : searchParams.get("productId")} : { query : ''}
    };

    try {
      // setIsLoading(true);
      const responseData: { data: IChat[] } = await makeRequest(config);
      if (responseData) {
        setUserChats(responseData.data);
        const chatIndex = responseData.data.findIndex((chat) => chat.id === chatUuid);
        console.log(chatUuid)
        setChatMessages(responseData.data[chatIndex].message);

      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault()
    // const url = API_ENDPOINTS.chat.sendMessage();
    console.log(selectedChat)
    // const chatIndex = userChats.findIndex((chat) => chat.id === selectedChat);
    if (selectedChat) {
      // const chatId = userChats[chatIndex].chatId;
      // const config = {
      //   method: 'post',
      //   url: url,
      //   data: { chatId: Number(chatId), messageText: message },
      // };
      try {
        const messageData = {
          chatId: selectedChat,
          message: message,
          userId: Number(localStorage.getItem("userId")),
        };
        if (socket) {
          socket.emit('sendMessage', messageData)
          setChatMessages((prevMessages) => [...prevMessages, {chatId: 1, createdDate: new Date().toString(), updatedDate: new Date().toString(), id:'', message, messageId:0, userId: Number(localStorage.getItem('userId'))}]);
          setMessage("");
        };
        // setIsLoading(true);
        // const responseData: { data: any } = await makeRequest(config);
        // if (responseData) {
        //   // setUserChats(responseData.data);
        // }
      } catch (err) {
        console.log(err);
      } finally {
        // setIsLoading(false);
      }
    }
  };

  // const getChatMessages = async () => {
  //   const url = API_ENDPOINTS.chat.getChatMessages(1);
  //   const config = {
  //     method: 'get',
  //     url: url,
  //   };
  //   try {
  //     // setIsLoading(true);
  //     const responseData: { data: [] } = await makeRequest(config);
  //     if (responseData) {
  //       setUserChats(responseData.data);
  //       console.log(responseData.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
    const chatIndex = userChats.findIndex((chat) => chat.id === id);
    setChatMessages(userChats[chatIndex].message);
  };

  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ChatView
        isExpanded={isExpanded}
        imageWidth={imageWidth}
        userChats={userChats}
        selectedChat={selectedChat}
        setSelectedChat={handleSelectChat}
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
        chatMessages={chatMessages}
        chatContainerRef={chatContainerRef}
      />
    </div>
  );
};

export default ChatViewContainer;
