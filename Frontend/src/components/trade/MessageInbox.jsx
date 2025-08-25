import React, { useState } from "react";
import {
  MessageCircle,
  Search,
  X,
  Send,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

const MessageInbox = ({ isOpen, onClose, isMobile }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState({});

  // Mock chat data with more users
  const chats = [
    {
      id: 1,
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Hey! Is the gaming laptop still available?",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b217?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Perfect! Let's meet tomorrow",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Mike Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Thanks for the trade!",
      time: "3h ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Is this still available?",
      time: "5h ago",
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: "James Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Great deal! 👍",
      time: "1d ago",
      unread: 0,
      online: false,
    },
    {
      id: 6,
      name: "Lisa Parker",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c3e9?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Can we meet tomorrow?",
      time: "2d ago",
      unread: 0,
      online: true,
    },
    {
      id: 7,
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Perfect condition, thanks!",
      time: "3d ago",
      unread: 0,
      online: false,
    },
    {
      id: 8,
      name: "Sophie Brown",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Looking for vintage items",
      time: "4d ago",
      unread: 0,
      online: true,
    },
    {
      id: 9,
      name: "Ryan Martinez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Interested in your post",
      time: "5d ago",
      unread: 0,
      online: false,
    },
    {
      id: 10,
      name: "Grace Lee",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      lastMessage: "Trade completed successfully!",
      time: "1w ago",
      unread: 0,
      online: true,
    },
  ];

  // Initialize default messages for each chat
  const defaultMessages = {
    1: [
      {
        id: 1,
        text: "Hey! Is the gaming laptop still available?",
        sender: "other",
        time: "2:30 PM",
        avatar: chats[0].avatar,
      },
      {
        id: 2,
        text: "Yes, it's still available! Would you like to see more photos?",
        sender: "me",
        time: "2:32 PM",
      },
    ],
    2: [
      {
        id: 1,
        text: "Perfect! Let's meet tomorrow",
        sender: "other",
        time: "1:00 PM",
        avatar: chats[1].avatar,
      },
    ],
    3: [
      {
        id: 1,
        text: "Thanks for the trade!",
        sender: "other",
        time: "11:00 AM",
        avatar: chats[2].avatar,
      },
      {
        id: 2,
        text: "You're welcome! Enjoy your new item!",
        sender: "me",
        time: "11:05 AM",
      },
    ],
    4: [
      {
        id: 1,
        text: "Is this still available?",
        sender: "other",
        time: "9:00 AM",
        avatar: chats[3].avatar,
      },
    ],
    5: [
      {
        id: 1,
        text: "Great deal! 👍",
        sender: "other",
        time: "Yesterday",
        avatar: chats[4].avatar,
      },
    ],
  };

  // Get current chat messages
  const getCurrentMessages = () => {
    if (!selectedChat) return [];
    return messages[selectedChat.id] || defaultMessages[selectedChat.id] || [];
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMsg = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: "me",
        time: currentTime,
      };

      // Update messages state
      setMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [
          ...(prev[selectedChat.id] || defaultMessages[selectedChat.id] || []),
          newMsg,
        ],
      }));

      setNewMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Message Inbox Container */}
      <div
        className={`
        ${
          isMobile
            ? "fixed inset-y-0 left-0 w-full max-w-sm z-50 transform transition-transform duration-300"
            : "w-full h-full"
        }
        bg-white border-r border-gray-200 flex flex-col pb-12
        ${isMobile ? "shadow-2xl" : ""}
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            </div>
            {isMobile && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Chat List or Chat View */}
        {!selectedChat ? (
          /* Chat List */
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>

                  {chat.unread > 0 && (
                    <div className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Chat View */
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200/50 bg-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedChat.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedChat.online ? "Online" : "Last seen 1h ago"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Video className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              {getCurrentMessages().map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "other" && (
                    <img
                      src={message.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover mb-1"
                    />
                  )}

                  <div
                    className={`flex flex-col ${
                      message.sender === "me" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                        message.sender === "me"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p
                      className={`text-xs mt-1 px-2 ${
                        message.sender === "me"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="flex items-center gap-2">
                <img
                  src={selectedChat.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200/50 bg-white"
            >
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:bg-gray-400"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>Press Enter to send</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageInbox;
