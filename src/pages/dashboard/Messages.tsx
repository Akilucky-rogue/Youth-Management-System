
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

type Message = {
  id: number;
  sender: "user" | "other";
  text: string;
  timestamp: Date;
  read: boolean;
};

type Contact = {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar?: string;
};

const Messages = () => {
  const { profile } = useAuth();
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample contacts
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Coach Michael",
      lastMessage: "How was your training yesterday?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: 1,
    },
    {
      id: 2,
      name: "Sarah Thompson",
      lastMessage: "Let's schedule your next evaluation",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: 1,
    },
  ]);
  
  // Sample messages for a conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "other",
      text: "Hi there! How was your training yesterday?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: 2,
      sender: "user",
      text: "It went really well! I managed to improve my time by 3 seconds.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      read: true,
    },
    {
      id: 3,
      sender: "other",
      text: "That's fantastic progress! Keep up the good work. Would you like to schedule another session this week?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.2),
      read: false,
    },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add new message to the conversation
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date(),
      read: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        sender: "other",
        text: "I'll review your progress and get back to you soon!",
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact);
    // Mark messages as read
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout title="Messages">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contacts List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center justify-between">
              <span>Conversations</span>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredContacts.length > 0 ? (
              <div className="space-y-2 mt-2">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      activeContact?.id === contact.id 
                        ? 'bg-talent-indigo/10' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm truncate">{contact.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(contact.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="ml-auto flex-shrink-0 h-5 w-5 bg-talent-indigo text-white rounded-full flex items-center justify-center text-xs">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-sm font-medium text-muted-foreground mb-1">No conversations match your search</h3>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Chat Area */}
        <Card className="md:col-span-2">
          {activeContact ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{activeContact.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[75%] rounded-lg p-3 ${
                            msg.sender === 'user' 
                              ? 'bg-talent-indigo text-white' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-talent-indigo hover:bg-talent-indigo/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Choose a contact from the list to view your conversation history
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
