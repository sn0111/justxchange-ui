import { ChatView } from '@/app/_components/chat_view';
import LoaderComponent from '@/components/LoaderComponent';
import { useSocket } from '@/hooks/useSocket';
import { IChat } from '@/interface/IChat';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
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

const ChatViewContainer = () => {
  const socket = useSocket(Number(localStorage.getItem('userId')));
  const [isExpanded, setIsExpanded] = useState(true);
  const [width] = useWindowSize();
  const [imageWidth, setImageWidth] = useState(Number);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userChats, setUserChats] = useState<IChat[]>([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // Update expanded state based on screen size
  useEffect(() => {
    setImageWidth(width * 0.8);
    setIsExpanded(width >= 1024); // Expands at lg breakpoint (1024px)
  }, [width]);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      await createChat();
      await getChats();
      setIsLoading(false);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        console.log(message);
        // setMessages((prevMessages) => [...prevMessages, message]);
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
      const responseData: { data: any } = await makeRequest(config);
      if (responseData) {
        // setUserChats(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const getChats = async () => {
    const url = API_ENDPOINTS.chat.getChats();
    const config = {
      method: 'get',
      url: url,
    };
    try {
      // setIsLoading(true);
      const responseData: { data: [] } = await makeRequest(config);
      if (responseData) {
        setUserChats(responseData.data);
        console.log(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const url = API_ENDPOINTS.chat.sendMessage();
    const chatId = userChats[selectedChatIndex].chatId;
    const config = {
      method: 'post',
      url: url,
      data: { chatId: Number(chatId), messageText: message },
    };
    try {
      // setIsLoading(true);
      const responseData: { data: any } = await makeRequest(config);
      if (responseData) {
        // setUserChats(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ChatView
        isExpanded={isExpanded}
        imageWidth={imageWidth}
        userChats={userChats}
        selectedChatIndex={selectedChatIndex}
        setSelectedChatIndex={setSelectedChatIndex}
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default ChatViewContainer;
