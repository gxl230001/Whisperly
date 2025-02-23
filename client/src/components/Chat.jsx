import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaw, FaPaperPlane } from 'react-icons/fa';

const ChatContainer = styled.div`
  height: 500px;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: #8CC0DE;
  color: white;
  border-radius: 15px 15px 0 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
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
  padding: 0.8rem 1rem;
  border-radius: 15px;
  max-width: 70%;
  ${props => props.sent ? `
    background-color: #8CC0DE;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
  ` : `
    background-color: #F0F0F0;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
  `}
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #E0F4FF;
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #E0F4FF;
  border-radius: 20px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #8CC0DE;
  }
`;

const SendButton = styled.button`
  background-color: #8CC0DE;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7AB2D0;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How are you today? 🐱", sent: false },
    { text: "I'm doing great, thanks for asking! 🌟", sent: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sent: true }]);
      setNewMessage('');
      
      // Simulate received message after a delay
      setTimeout(() => {
        const responses = [
          "That's wonderful! 🐱",
          "Tell me more! 🐾",
          "How interesting! 🌟",
          "Purr-fect! 😺",
          "Meow-velous! 🐱"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { text: randomResponse, sent: false }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <FaPaw /> Chat with Whiskers
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} sent={message.sent}>
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSend}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat; 