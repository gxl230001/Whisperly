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
  position: relative;
  min-height: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  border-right: 2px solid #E0F4FF;
  padding-right: 2rem;
  width: 150px;
  height: 100%;
`;

const PawButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background-color: #8CC0DE;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  width: 100%;

  &:hover {
    background-color: #7AB2D0;
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(0);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: #2B4865;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: absolute;
  left: 2rem;
  top: 2rem;
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const WhiskersContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
  cursor: pointer;
  text-align: center;
  width: 150px;
`;

const WhiskersImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const MessageBubble = styled.div`
  background-color: #FFF5E0;
  padding: 0.8rem;
  border-radius: 15px;
  position: absolute;
  bottom: 120px;
  left: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 150px;
  animation: fadeIn 0.5s ease-in;
  z-index: 1;
  font-size: 0.9rem;

  &:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 45px;
    border-width: 10px;
    border-style: solid;
    border-color: #FFF5E0 transparent transparent transparent;
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

const MainContent = styled.div`
  flex: 1;
  padding: 2rem 3rem;
`;

const HomeTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #2B4865;
  margin-bottom: 0.5rem;
`;

const Note = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
`;

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const encouragingMessages = [
    "You're doing great! Keep going! 🌟",
    "Every small step counts! Proud of you! 🎉",
    "You've got this! I believe in you! 💪",
    "Remember to stay pawsitive! 🐾",
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
        <ButtonContainer>
          <PawButton>
            <FaPaw /> Home
          </PawButton>
          <PawButton>
            <FaPaw /> Profile
          </PawButton>
          <PawButton>
            <FaPaw /> Chat
          </PawButton>
          <PawButton>
            <FaPaw />  Help
          </PawButton>
          <WhiskersContainer onClick={handleWhiskersClick}>
            <WhiskersImage src={whiskersLogo} alt="Whiskers" />
            {showMessage && (
              <MessageBubble>
                {message}
              </MessageBubble>
            )}
          </WhiskersContainer>
        </ButtonContainer>

        <MainContent>
          <HomeTitle>Home</HomeTitle>
          <Note>Welcome back! Click on Whiskers for a daily dose of encouragement 🐱</Note>
          <Note>Announcements: If you're ever feeling down, click the help button on the</Note>
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 