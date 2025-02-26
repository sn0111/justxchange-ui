import { IProduct, IUser } from '@/interface';
import { IChat, IMessage } from '@/interface/IChat';
import { RefObject, useState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

interface IChatView {
  isExpanded: boolean;
  imageWidth: number;
  userChats: IChat[];
  selectedChat: string;
  setSelectedChat: (id: string) => void;
  sendMessage: (event: React.FormEvent) => void;
  message: string;
  setMessage: (message: string) => void;
  chatMessages: IMessage[];
  chatContainerRef: RefObject<HTMLDivElement>;
  buyer: IUser | undefined;
  product: IProduct | undefined;
  isTyping?: boolean; // New prop for typing status
  lastSeen?: string; // New prop for last seen
  onlineStatus?: 'online' | 'offline'; // New prop for online status
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2">
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    </div>
  </div>
);

const ChatView = ({
  isExpanded,
  imageWidth,
  userChats,
  selectedChat,
  setSelectedChat,
  sendMessage,
  message,
  setMessage,
  chatMessages,
  chatContainerRef,
  buyer,
  product,
  isTyping = false,
  lastSeen = '',
  onlineStatus = 'offline',
}: IChatView) => {
  const [localTyping, setLocalTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setLocalTyping(true);

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      setLocalTyping(false);
    }, 2000);

    setTypingTimeout(timeout as NodeJS.Timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const isCurrentUser = (userId: number) =>
    userId === Number(localStorage.getItem('userId'));

  const formatLastSeen = (timestamp: string) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();

    // Difference in milliseconds
    const diff = now.getTime() - date.getTime();

    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }

    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    // Less than 7 days
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    // Format for older dates
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="flex flex-col lg:flex-row p-6">
        {/* Sidebar code remains the same */}
        <div
          className={`flex ${
            isExpanded
              ? 'flex-col w-64'
              : 'flex-row overflow-x-scroll flex-nowrap'
          } gap-2 lg:w-80 duration-300`}
          style={{ width: isExpanded ? '18rem' : `${imageWidth}px` }}
        >
          {/* Sidebar content remains the same */}
          {userChats.map((chat, index) => (
            /* Existing sidebar chat items code */
            <div
              key={index}
              className={`flex items-center gap-4 min-h-[72px] py-2 px-4 hover:bg-[#E4E9F1] cursor-pointer rounded-lg transition-colors ${
                isExpanded ? '' : 'justify-center'
              } ${selectedChat === chat.id ? 'bg-[#E4E9F1]' : 'bg-[#F8F9FB]'}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div
                className="bg-center bg-no-repeat bg-cover rounded-lg size-14 shrink-0"
                style={{
                  backgroundImage: `url("${chat.product.images[0]}")`,
                }}
              />
              {isExpanded && (
                <div className="flex flex-col justify-center overflow-hidden">
                  <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
                    {chat.product.productName}
                  </p>
                  <p className="text-[#141C24] text-sm font-normal leading-normal line-clamp-2">
                    {chat.product.userId !=
                    Number(localStorage.getItem('userId'))
                      ? `Rs ${chat.product.amount}`
                      : chat.buyer.firstName}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col bg-white rounded-lg shadow-lg ml-6">
          {/* Chat Header with Status */}
          <div className="flex flex-col py-4 px-6 border-b border-[#E4E9F1]">
            <div className="flex justify-between items-center">
              <p className="text-[#141C24] text-[18px] md:text-[22px] font-bold leading-tight">
                {buyer?.userId === Number(localStorage.getItem('userId'))
                  ? `${product?.productName}`
                  : `${product?.productName}`}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
              <span className="text-sm text-gray-600">
                {onlineStatus === 'online'
                  ? 'Online'
                  : lastSeen
                    ? `Last seen ${formatLastSeen(lastSeen)}`
                    : 'Offline'}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex flex-1 flex-col overflow-y-auto max-h-[500px] min-h-[500px] bg-white rounded-lg p-4 space-y-4"
          >
            {chatMessages.map((msg, index) => {
              const isOwn = isCurrentUser(msg.userId);
              return (
                <div
                  key={index}
                  className={`flex items-end gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        isOwn
                          ? 'bg-gradiant-theme text-white font-bold'
                          : 'bg-[#E4E9F1] text-[#141C24]'
                      }`}
                    >
                      <p className="text-base font-normal leading-normal break-words">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center px-4 py-3 gap-3 border-t border-[#E4E9F1]">
            <form
              onSubmit={sendMessage}
              className="flex flex-1 items-center bg-[#E4E9F1] rounded-xl px-4"
            >
              <textarea
                placeholder="Type here"
                rows={1}
                className="w-full flex-1 resize-none overflow-hidden text-[#141C24] bg-[#E4E9F1] placeholder:text-[#3F5374] rounded-xl focus:outline-none focus:ring-0 border-none py-3 min-h-[48px] max-h-32"
                value={message}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = `${target.scrollHeight}px`;
                }}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
              />
              <button
                type="submit"
                className="ml-3 min-w-[44px] h-8 flex items-center justify-center bg-gradiant-theme text-white hover:bg-gradiant-theme-btn rounded-xl transition-transform duration-200 hover:scale-105"
              >
                <IoSend size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
