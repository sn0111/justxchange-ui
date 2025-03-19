'use client';
import { ChatView } from '@/app/_components/chat_view';
import LoaderComponent from '@/components/LoaderComponent';
import { IProduct, IUser } from '@/interface';
import { IChat, IMessage } from '@/interface/IChat';
import { API_URL } from '@/lib/constants';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePathname } from 'next/navigation';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

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
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userChats, setUserChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [buyer, setBuyer] = useState<IUser>();
  const [product, setProduct] = useState<IProduct>();
  const searchParams = useSearchParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [buyerLastSeen, setBuyerLastSeen] = useState<string>('');
  const [userLastSeen, setUserLastSeen] = useState<string>('');
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline'>(
    'offline'
  );
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname(); // Detect route changes
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
    const newSocket = io(API_URL, {
      transports: ['websocket', 'polling'], // Ensure proper transport
    });

    newSocket.on('connect', () => {
      console.log('Connected to the server:', newSocket.id);
    });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from the server');
    // });

    newSocket.on('disconnecting', () => {
      newSocket.emit('user-disconnect', {
        chat: selectedChat,
        userId: localStorage.getItem('userId'),
        isOwner: isOwner,
      });
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
      if (message.userId != Number(localStorage.getItem('userId')))
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('receiveMessage', handleMessage);

    // Cleanup
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [socket]);

  const handleTyping = () => {
    if (!socket) return;

    // setIsTyping(true);
    socket.emit('typing', {
      chatId: selectedChat,
      userId: 2,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stopTyping', {
        chatId: selectedChat,
        userId: Number(localStorage.getItem('userId')),
      });
    }, 2000); // Stop typing after 2 seconds of inactivity
  };

  const createChat = async () => {
    const url = API_ENDPOINTS.chat.createChat();
    const productUuid =
      searchParams.get('productId') || localStorage.getItem('productId');
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
        if (Array.isArray(responseData.data)) {
          chatUuid = responseData.data[0].id;
          setIsOwner(
            Number(localStorage.getItem('userId')) ==
              responseData.data[0].product.userId
          );

          setUserLastSeen(responseData.data[0].userLastSeen);
          setBuyerLastSeen(responseData.data[0].buyerLastSeen);
        }
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
      params: searchParams.get('productId')
        ? { query: searchParams.get('productId') }
        : { query: '' },
    };

    try {
      // setIsLoading(true);
      const responseData: { data: IChat[] } = await makeRequest(config);
      if (responseData) {
        setUserChats(responseData.data);
        const chatIndex = responseData.data.findIndex(
          (chat) => chat.id === chatUuid
        );
        console.log(responseData.data[0]);
        console.log(chatUuid);
        setBuyer(responseData.data[chatIndex].buyer);
        setProduct(responseData.data[chatIndex].product);
        setChatMessages(responseData.data[chatIndex].message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    // const url = API_ENDPOINTS.chat.sendMessage();
    console.log(selectedChat);
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
          userId: Number(localStorage.getItem('userId')),
        };
        if (socket) {
          socket.emit('sendMessage', messageData);
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              chatId: 1,
              createdDate: new Date().toString(),
              updatedDate: new Date().toString(),
              id: '',
              message,
              messageId: 0,
              userId: Number(localStorage.getItem('userId')),
            },
          ]);
          setMessage('');
        }
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

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
    const chatData = userChats.find((chat) => chat.id === id);
    if (chatData) {
      setChatMessages(chatData.message);
      setBuyer(chatData.buyer);
      setProduct(chatData.product);
      setIsOwner(
        Number(localStorage.getItem('userId')) == chatData.product.userId
      );
      setUserLastSeen(chatData.userLastSeen);
      setBuyerLastSeen(chatData.buyerLastSeen);
    }
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (!socket) return;

    socket.on('userTyping', ({ chatId, userId }) => {
      if (chatId === selectedChat && userId !== 11) {
        setIsTyping(true);
      }
    });

    socket.on('userStoppedTyping', ({ chatId, userId }) => {
      if (
        chatId === selectedChat &&
        userId !== Number(localStorage.getItem('userId'))
      ) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, [socket, selectedChat]);

  useEffect(() => {
    if (!socket) return;

    const userId = Number(localStorage.getItem('userId'));

    socket.emit('setOnline', { userId });

    socket.on('userOnlineStatus', ({ userId, status }) => {
      if (userId !== Number(localStorage.getItem('userId'))) {
        setOnlineStatus(status);
      }
    });

    const handleBeforeUnload = () => {
      socket.emit('setOffline', { userId });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        socket.emit('setOffline', { userId });
      } else {
        socket.emit('setOnline', { userId });
      }
    };
    const handleRouteChange = () => {
      socket.emit('setOffline', { userId });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      socket.emit('setOffline', { userId });
      socket.off('userOnlineStatus');
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [socket, pathname]);

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
        setMessage={(value) => {
          setMessage(value);
          handleTyping();
        }}
        chatMessages={chatMessages}
        chatContainerRef={chatContainerRef}
        buyer={buyer}
        product={product}
        isTyping={isTyping}
        lastSeen={isOwner ? buyerLastSeen : userLastSeen}
        onlineStatus={onlineStatus}
      />
    </div>
  );
};

export default ChatViewContainer;
