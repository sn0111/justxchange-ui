import { ChatView } from '@/app/_components/chat_view';
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [width] = useWindowSize();
  const [imageWidth, setImageWidth] = useState(Number);

  // Update expanded state based on screen size
  useEffect(() => {
    setImageWidth(width * 0.8);
    setIsExpanded(width >= 1024); // Expands at lg breakpoint (1024px)
  }, [width]);
  return (
    <div>
      <ChatView isExpanded={isExpanded} imageWidth={imageWidth}/>
    </div>
  );
};

export default ChatViewContainer;
