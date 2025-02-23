import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import whiskersLogo from '../assets/images/whiskers.png';
// Add floating animation
const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(-2deg);
  }
  50% {
    transform: translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateY(-10px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const FloatingSprite = styled.img`
  width: 200px;
  height: auto;
  animation: ${float} 6s ease-in-out infinite;
  margin-bottom: 2rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
  object-fit: contain;

  &:hover {
    animation: ${pulse} 1s ease-in-out infinite;
    cursor: pointer;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #E0F4FF 0%, #B9E7FF 100%); // Soft, calming blue gradient
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden; // Add this to prevent any overflow
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  color: #2B4865;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  text-transform: uppercase; 
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #256D85; 
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 350px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-family: 'Poppins', sans-serif;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &.login {
    background-color: #8CC0DE; // Soft blue
    color: white;
    
    &:hover {
      background-color: #7AB2D0;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }
  
  &.signup {
    background-color: white;
    color: #8CC0DE;
    border: 2px solid #8CC0DE;
    
    &:hover {
      background-color: #F9F9F9;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 200px;
`;

const WaveDecoration = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
  opacity: 0.6;
  pointer-events: none;
`;

const TitleScreen = () => {
  return (
    <TitleContainer>
      <FloatingSprite 
        src={whiskersLogo}
        alt="whiskers"
        className="whiskers-image"
      />
      <Title>Whisperly</Title>
      <Subtitle>
        A gentle space for sharing, healing, and finding peace. 
        Join our supportive community where every voice matters.
      </Subtitle>
      <ButtonContainer>
        <StyledLink to="/login">
          <StyledButton className="login">Log In</StyledButton>
        </StyledLink>
        <StyledLink to="/signup">
          <StyledButton className="signup">Sign Up</StyledButton>
        </StyledLink>
      </ButtonContainer>
      <WaveDecoration />
    </TitleContainer>
  );
};

export default TitleScreen; 