import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaw } from 'react-icons/fa';
import whiskersLogo from '../assets/images/whiskers.png';

const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #E0F4FF 0%, #B9E7FF 100%);
`;

const DashboardContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
  width: 100%;
`;

const PawButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 20px;
  background-color: #8CC0DE;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #7AB2D0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: #2B4865;
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const WhiskersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  cursor: pointer;
  text-align: center;
  position: relative;
`;

const WhiskersImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const MessageBubble = styled.div`
  background-color: #FFF5E0;
  padding: 1rem;
  border-radius: 15px;
  position: absolute;
  margin-top: 200px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 300px;
  animation: fadeIn 0.5s ease-in;
  z-index: 1;
  font-size: 1.1rem;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #FFF5E0 transparent;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const encouragingMessages = [
    "You're doing great! Keep going! 🌟",
    "Every small step counts! Proud of you! 🎉",
    "You've got this! I believe in you! 💪",
    "Remember to take breaks and stay pawsitive! 🐾",
    "You're making amazing progress! 🌈",
    "Paws and relax! 🐱",
    "Today is a great day to be amazing! ✨",
    "You're absolutely purrfect! 😺",
    "You're going to be feline fine! 🐱",
    "Stay pawsome, my friend! 🐾"
  ];

  const handleWhiskersClick = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <WhiskersContainer onClick={handleWhiskersClick}>
          <Title>Home</Title>
          <WhiskersImage src={whiskersLogo} alt="Whiskers" />
          {showMessage && (
            <MessageBubble>
              {message}
            </MessageBubble>
          )}
        </WhiskersContainer>
        
        <ButtonContainer>
          <PawButton>
            <FaPaw /> Profile
          </PawButton>
          <PawButton>
            <FaPaw /> Chat
          </PawButton>
          <PawButton>
            <FaPaw /> 
          </PawButton>
        </ButtonContainer>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 