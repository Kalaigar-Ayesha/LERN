
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, Search, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real data from API
  const conversations = [
    {
      id: '1',
      participant: {
        name: 'Sarah Chen',
        avatar: '',
        initials: 'SC'
      },
      lastMessage: 'Sure! You can pick up the books tomorrow after 3 PM.',
      timestamp: '2 hours ago',
      unread: 2,
      item: 'Gardening Books Collection'
    },
    {
      id: '2',
      participant: {
        name: 'Mike Johnson',
        avatar: '',
        initials: 'MJ'
      },
      lastMessage: 'The drill is available this weekend. When would work for you?',
      timestamp: '1 day ago',
      unread: 0,
      item: 'Power Drill Set'
    },
    {
      id: '3',
      participant: {
        name: 'Emma Wilson',
        avatar: '',
        initials: 'EW'
      },
      lastMessage: 'Thank you so much! The baby carrier was perfect.',
      timestamp: '3 days ago',
      unread: 0,
      item: 'Baby Carrier'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'Hi! I saw your request for a power drill. I have one available.',
      timestamp: '2 days ago',
      isOwn: false
    },
    {
      id: '2',
      senderId: '1',
      content: 'That\'s perfect! When would be a good time to pick it up?',
      timestamp: '2 days ago',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'The drill is available this weekend. When would work for you?',
      timestamp: '1 day ago',
      isOwn: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4 lg:mb-6 text-sm lg:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
              <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 text-sm lg:text-base">Connect with your community</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] lg:h-[600px]">
          {/* Conversations List */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conv.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conv.participant.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
                          {conv.participant.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{conv.participant.name}</h3>
                          {conv.unread > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-1 truncate">{conv.item}</p>
                        <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm h-full flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="pb-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
                          MJ
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Mike Johnson</h3>
                        <p className="text-sm text-gray-600">About: Power Drill Set</p>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/80' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
