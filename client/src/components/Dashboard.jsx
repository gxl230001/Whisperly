import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaw } from 'react-icons/fa';
import whiskersLogo from '../assets/images/whiskers.png';
import Chat from './Chat';
import Profile from './Profile';
import visitIcon from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a3 from '../assets/images/a3.png';
import a4 from '../assets/images/a4.png';
import a5 from '../assets/images/a5.png';
import a6 from '../assets/images/a6.png';

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
  width: 180px;
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
  width: 180px;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(2deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    75% {
      transform: translateY(-10px) rotate(-2deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
`;

const WhiskersImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));

  &:hover {
    transform: scale(1.1);
  }
`;

const MessageBubble = styled.div`
  background-color: #FFF5E0;
  padding: 0.8rem;
  border-radius: 15px;
  position: absolute;
  bottom: 160px;
  left: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 180px;
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
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const HomeTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #2B4865;
  margin-bottom: 1.5rem;
  position: relative;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.4rem;
`;

const Note = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 0.95rem;
  background-color: #F8F9FF;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  border-left: 4px solid #8CC0DE;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }

  span {
    display: block;
    font-weight: 600;
    color: #2B4865;
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0;
    line-height: 1.4;
  }
`;

const HotlinesContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #F8F9FF;
  border-radius: 15px;
  border-left: 4px solid #FF6B6B;
`;

const HotlineTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  color: #2B4865;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const HotlineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotlineItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const HotlineName = styled.h4`
  font-family: 'Poppins', sans-serif;
  color: #2B4865;
  font-size: 1rem;
  margin: 0;
`;

const HotlineInfo = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 0.9rem;
  margin: 0;
`;

const HotlineLink = styled.a`
  color: #8CC0DE;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DecorativeIcon = styled.img`
  width: 250px;
  height: 250px;
  position: absolute;
  top: -100px;
  right: -100px;
  opacity: 0.8;
  pointer-events: none;
  z-index: 1;
`;

const MoodContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.2rem;
  margin: 0.5rem 0;
  padding: 0.2rem;
`;

const MoodSpectrum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 600px;
  margin-top: 0.1rem;
  position: relative;
`;

const MoodSlider = styled.input`
  width: 100%;
  height: 15px;
  -webkit-appearance: none;
  background: linear-gradient(to right, #FF6B6B, #FFD93D, #6BCB77);
  border-radius: 10px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: white;
    border: 3px solid #8CC0DE;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
`;

const MoodValue = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #2B4865;
  min-width: 40px;
  text-align: center;
  position: absolute;
  right: -45px;
  top: 50%;
  transform: translateY(-50%);
`;

const MoodImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  animation: floatMood 3s ease-in-out infinite;
  margin-bottom: 0.1rem;

  @keyframes floatMood {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const MoodMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  color: ${props => props.isLowMood ? '#FF6B6B' : '#6BCB77'};
  font-size: 1.1rem;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 500;
  background: ${props => props.isLowMood ? 'rgba(255, 107, 107, 0.1)' : 'rgba(107, 203, 119, 0.1)'};
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  border: 2px dashed ${props => props.isLowMood ? '#FF6B6B' : '#6BCB77'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:before {
    content: '${props => props.isLowMood ? '🌸' : '✨'}';
    margin-right: 8px;
  }

  &:after {
    content: '${props => props.isLowMood ? '💝' : '🌟'}';
    margin-left: 8px;
  }
`;

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [moodValue, setMoodValue] = useState(5);

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

  const getMoodImage = (value) => {
    if (value <= 2) return a6;
    if (value <= 4) return a5;
    if (value <= 6) return a2;
    if (value <= 8) return a4;
    return a3;
  };

  const handleWhiskersClick = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return (
          <>
            <HomeTitle>Home</HomeTitle>
            <NotesContainer>
              <Note>
                <span>✨ Welcome Back!</span>
                <p>Click on Whiskers for a daily dose of encouragement 🐱</p>
              </Note>
              <Note>
                <span>📢 Announcements</span>
                <p>If you're ever feeling down, click the help button on the left. We're here for you! 💕</p>
              </Note>
              <Note>
                <span>Daily Mood Check</span>
                <p>How are you feeling today? Use the slider below to let us know.</p>
              </Note>
            </NotesContainer>
            <MoodContainer>
              <MoodSpectrum>
                <MoodSlider
                  type="range"
                  min="1"
                  max="10"
                  value={moodValue}
                  onChange={(e) => setMoodValue(parseInt(e.target.value))}
                />
                <MoodValue>{moodValue}</MoodValue>
              </MoodSpectrum>
              <MoodImage src={getMoodImage(moodValue)} alt="Mood" />
              <MoodMessage isLowMood={moodValue <= 4}>
                {moodValue <= 4 
                  ? "We notice you're not feeling your best. Please visit Dr. Whiskers in the Visit tab for support! 🐱💕"
                  : "You're doing great! Keep up the positive energy! ✨"
                }
              </MoodMessage>
            </MoodContainer>
          </>
        );
      case 'profile':
        return (
          <>
            <HomeTitle>Profile</HomeTitle>
            <Profile />
          </>
        );
      case 'visit':
        return (
          <>
            <HomeTitle>Visit</HomeTitle>
            <div style={{ position: 'relative' }}>
              <DecorativeIcon src={visitIcon} alt="Visit" />
              <Chat />
            </div>
            <HotlinesContainer>
              <HotlineTitle>Crisis Support & Resources</HotlineTitle>
              <HotlineList>
                <HotlineItem>
                  <HotlineName>988 Suicide & Crisis Lifeline</HotlineName>
                  <HotlineInfo>
                    Dial 988 for 24/7 free and confidential support.{' '}
                    <HotlineLink href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </HotlineLink>
                  </HotlineInfo>
                </HotlineItem>

                <HotlineItem>
                  <HotlineName>Emergency Services</HotlineName>
                  <HotlineInfo>Call 911 for immediate emergency assistance.</HotlineInfo>
                </HotlineItem>

                <HotlineItem>
                  <HotlineName>Crisis Text Line</HotlineName>
                  <HotlineInfo>
                    Text HOME to 741741 for free 24/7 crisis counseling.{' '}
                    <HotlineLink href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </HotlineLink>
                  </HotlineInfo>
                </HotlineItem>

                <HotlineItem>
                  <HotlineName>NAMI Helpline</HotlineName>
                  <HotlineInfo>
                    Call 1-800-950-NAMI (6264) or text "HelpLine" to 62640.{' '}
                    <HotlineLink href="https://www.nami.org/help" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </HotlineLink>
                  </HotlineInfo>
                </HotlineItem>

                <HotlineItem>
                  <HotlineName>SAMHSA National Helpline</HotlineName>
                  <HotlineInfo>
                    Call 1-800-662-HELP (4357) for treatment referrals.{' '}
                    <HotlineLink href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </HotlineLink>
                  </HotlineInfo>
                </HotlineItem>

                <HotlineItem>
                  <HotlineName>PTSD Foundation of America</HotlineName>
                  <HotlineInfo>
                    Call (877) 717-PTSD (7873) for veterans support.{' '}
                    <HotlineLink href="https://ptsdusa.org/" target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </HotlineLink>
                  </HotlineInfo>
                </HotlineItem>
              </HotlineList>
            </HotlinesContainer>
          </>
        );
      case 'chat':
        return (
          <>
            <HomeTitle>Chat</HomeTitle>
            <NotesContainer>
              <Note>
                <span>🏠 Places to Go</span>
                <p>Explore new places and meet new friends!</p>
              </Note>
            </NotesContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <ButtonContainer>
          <PawButton onClick={() => setCurrentView('home')}>
            <FaPaw /> Home
          </PawButton>
          <PawButton onClick={() => setCurrentView('profile')}>
            <FaPaw /> Profile
          </PawButton>
          <PawButton onClick={() => setCurrentView('visit')}>
            <FaPaw /> Visit
          </PawButton>
          <PawButton onClick={() => setCurrentView('chat')}>
            <FaPaw /> Chat
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
          {renderContent()}
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 