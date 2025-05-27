
import React, { useState } from 'react';
import Layout from '@/components/Layout';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Thanks for the ride! See you tomorrow.",
      time: "2 min ago",
      unread: 2,
      avatar: "JD"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "What time should we leave?",
      time: "1 hour ago",
      unread: 0,
      avatar: "SW"
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "I'm running 5 minutes late",
      time: "Yesterday",
      unread: 1,
      avatar: "MJ"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hi! I'm interested in your ride to Boston tomorrow.",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      content: "Great! I'll be leaving at 8 AM sharp. Does that work for you?",
      time: "10:35 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "John Doe",
      content: "Perfect! I'll be ready. Thanks for the ride!",
      time: "10:37 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "You",
      content: "No problem! See you tomorrow morning.",
      time: "10:40 AM",
      isMe: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Chat with your ride companions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Conversations</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedChat === index ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {chats[selectedChat]?.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{chats[selectedChat]?.name}</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isMe
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isMe ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
