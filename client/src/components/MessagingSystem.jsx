import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaUserPlus } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  height: 600px;
  gap: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const ConversationsList = styled.div`
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ConversationsHeader = styled.div`
  padding: 1rem;
  background: #E0F4FF;
  border-bottom: 1px solid #B9E7FF;

  h3 {
    color: #2B4865;
    font-weight: 600;
    margin: 0;
  }
`;

const ConversationItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  background: ${props => props.active ? '#F0F9FF' : 'white'};

  &:hover {
    background: #F0F9FF;
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8CC0DE;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
`;

const ConversationInfo = styled.div`
  flex: 1;
`;

const Name = styled.h4`
  margin: 0;
  color: #2B4865;
  font-size: 0.95rem;
`;

const Role = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.8rem;
`;

const UnreadBadge = styled.span`
  background: #7AB2D0;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const ChatArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: #E0F4FF;
  border-bottom: 1px solid #B9E7FF;

  h3 {
    color: #2B4865;
    font-weight: 600;
    margin: 0;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: ${props => props.sent ? '#7AB2D0' : '#F0F9FF'};
  color: ${props => props.sent ? 'white' : '#2B4865'};
  font-size: 0.9rem;
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: ${props => props.sent ? '#B9E7FF' : '#666'};
  margin-top: 0.3rem;
`;

const InputArea = styled.form`
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #B9E7FF;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #7AB2D0;
  }
`;

const SendButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #7AB2D0;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #6AA1BF;
  }

  &:disabled {
    background: #B9E7FF;
    cursor: not-allowed;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;



const OtherUsersList = styled.div`
  margin: 0 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const AddFriendButton = styled.button`
  background: #7AB2D0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #6AA1BF;
    transform: scale(1.1);
  }
`;

const OtherUserItem = styled(ConversationItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  &:hover {
    background: #F0F9FF;
  }
`;

const MessagingSystem = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const friends = JSON.parse(localStorage.getItem('friends')) || [];
  const [showOtherUsers, setShowOtherUsers] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [showRandomUsers, setShowRandomUsers] = useState(false);

  const conversations = friends.map((friend) => ({
    id: friend._id,
    name: `${friend.firstName} ${friend.lastName}`,
    role: 'Friend'
  }));
  const [activeConversation, setActiveConversation] = useState(1);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      withCredentials: true,
    });

    socketRef.current.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      conversationId: activeConversation,
    };

    socketRef.current.emit('message', message);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Container>
      <ConversationsList>
        <ConversationsHeader>
          <h3>Conversations</h3>
        </ConversationsHeader>
        {conversations.map((conv) => (
          <ConversationItem 
            key={conv.id}
            active={activeConversation === conv.id}
            onClick={() => setActiveConversation(conv.id)}
          >
            <ConversationHeader>
              <Avatar>{conv.name[0]}</Avatar>
              <ConversationInfo>
                <Name>{conv.name}</Name>
                <Role>{conv.role}</Role>
              </ConversationInfo>
              {conv.unread > 0 && (
                <UnreadBadge>{conv.unread}</UnreadBadge>
              )}
            </ConversationHeader>
          </ConversationItem>
        ))}
      </ConversationsList>

      <ChatArea>
        <ChatHeader>
          <h3>{conversations.find(c => c.id === activeConversation)?.name}</h3>
        </ChatHeader>

        <MessagesContainer>
          {messages
            .filter(m => m.conversationId === activeConversation)
            .map((message) => (
              <Message key={message.id} sent={message.sender === 'user'}>
                <MessageBubble sent={message.sender === 'user'}>
                  {message.text}
                </MessageBubble>
                <MessageTime sent={message.sender === localStorage.getItem('userId')}>
                  {formatTime(message.timestamp)}
                </MessageTime>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
  
          <InputArea onSubmit={handleSendMessage}>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!activeConversation}
            />
            <SendButton type="submit" disabled={!newMessage.trim() || !activeConversation}>
              Send
            </SendButton>
          </InputArea>
        </ChatArea>
      </Container>
    );
  };
  
  export default MessagingSystem;