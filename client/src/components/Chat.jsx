import React, { useState } from 'react';
import styled from 'styled-components';
import OpenAI from 'openai';
import { FaPaw, FaPaperPlane } from 'react-icons/fa';
import visitIcon from '../assets/images/a1.png';

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, make API calls from backend
});

const WhiskersImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 1rem auto;
  display: block;
`;

const DrWhiskersImage = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  top: -125px;
  right: -50px;
  opacity: 1;
  pointer-events: none;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  z-index: 10;
  transform: rotate(5deg);
`;

const ChatContainer = styled.div`
  height: 500px;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  overflow: visible;
  margin-top: 125px;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  padding-right: 200px;
  background: #8CC0DE;
  color: white;
  border-radius: 15px 15px 0 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #7AB2D0;
    transform: scale(1.1);
  }

  &:active:not(:disabled) {
    transform: scale(1);
  }
`;

const LoadingMessage = styled(Message)`
  background-color: #F0F0F0;
  color: #666;
  align-self: flex-start;
`;

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today? 🐱", sent: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (newMessage.trim() && !isLoading) {
      try {
        setIsLoading(true);
        // Add user message
        const userMessage = { text: newMessage, sent: true };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setNewMessage('');

        // Get AI response
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are a helpful and friendly AI assistant named Whiskers. You like to use cat emojis in your responses." },
            { role: "user", content: newMessage }
          ],
          max_tokens: 150
        });

        // Add AI response
        const aiMessage = { 
          text: completion.choices[0].message.content, 
          sent: false 
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { 
          text: "I apologize, but I'm having trouble responding right now 😿", 
          sent: false 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <DrWhiskersImage src={visitIcon} alt="Dr. Whiskers" />
      <ChatHeader>
        <FaPaw /> Chat with Dr. Whiskers
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} sent={message.sent}>
            {message.text}
          </Message>
        ))}
        {isLoading && (
          <LoadingMessage>
            Thinking... 🐱 :3
          </LoadingMessage>
        )}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <SendButton onClick={handleSend} disabled={isLoading || !newMessage.trim()}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;