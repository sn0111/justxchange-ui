import { ChatView } from '@/app/_components/chat_view';
import LoaderComponent from '@/components/LoaderComponent';
import { useSocket } from '@/hooks/useSocket';
import { IChat, IMessage } from '@/interface/IChat';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Hook to get window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

const ProductChatContainer = () => {
  const socket = useSocket(Number(1));
  const [isExpanded, setIsExpanded] = useState(true);
  const [width] = useWindowSize();
  const [imageWidth, setImageWidth] = useState(Number);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proeductChats, setProductChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get('productId');
    console.log(productId);
  });

  // Update expanded state based on screen size
  useEffect(() => {
    setImageWidth(width * 0.8);
    setIsExpanded(width >= 1024); // Expands at lg breakpoint (1024px)
  }, [width]);

  useEffect(() => {
    // const initializeChat = async () => {
    //   setIsLoading(true);
    //   await createChat();
    //   setIsLoading(false);
    // };
    // initializeChat();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        console.log(message);
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const createChat = async () => {
    const url = API_ENDPOINTS.chat.createChat();
    const config = {
      method: 'post',
      url: url,
      data: { productId: Number(localStorage.getItem('productId')) },
    };
    try {
      // setIsLoading(true);
      const responseData: { data: IChat } = await makeRequest(config);
      if (responseData) {
        await getChats(responseData.data.id);
        setSelectedChat(responseData.data.id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const getChats = async (productUuid: string) => {
    const url = API_ENDPOINTS.chat.getProductChats(productUuid);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      // setIsLoading(true);
      const responseData: { data: [] } = await makeRequest(config);
      if (responseData) {
        setProductChats(responseData.data);
        setChatMessages(proeductChats[0].message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    // const url = API_ENDPOINTS.chat.sendMessage();
    const chatIndex = proeductChats.findIndex(
      (chat) => chat.id === selectedChat
    );
    if (chatIndex > 0) {
      const chatId = proeductChats[chatIndex].chatId;
      // const config = {
      //   method: 'post',
      //   url: url,
      //   data: { chatId: Number(chatId), messageText: message },
      // };
      try {
        const messageData = {
          chatId: Number(chatId),
          message: message,
          userId: 1,
        };
        if (socket) socket.emit('sendMessage', messageData);
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
    const chatIndex = proeductChats.findIndex((chat) => chat.id === id);
    setChatMessages(proeductChats[chatIndex].message);
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ChatView
        isExpanded={isExpanded}
        imageWidth={imageWidth}
        userChats={proeductChats}
        selectedChat={selectedChat}
        setSelectedChat={handleSelectChat}
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
        chatMessages={chatMessages}
      />
    </div>
  );
};

export default ProductChatContainer;
