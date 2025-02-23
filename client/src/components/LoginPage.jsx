import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #E0F4FF 0%, #B9E7FF 100%);
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  color: #2B4865;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #E0F4FF;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8CC0DE;
  }
`;

const LoginButton = styled.button`
  background-color: #8CC0DE;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  margin-top: 1rem;

  &:hover {
    background-color: #7AB2D0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackLink = styled(Link)`
  color: #256D85;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`; 


const hashPassword=async (password)=>{
  const hash=await bcrypt.hash(password,10);
  return hash;

}

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });
      
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      //console.log(data.user);
      
      const response2=await fetch('http://localhost:5000/api/friends',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({friendsId:data.user.friends}),
      });
      const data2 = await response2.json();
      

      const response3=await fetch('http://localhost:5000/api/all',{
        method:'POST',
        headers:{
          'Content-Type':'application/json', 
        },
        body:JSON.stringify({userId:data.user._id,friendsId:data.user.friends}),
      });
      const data3 = await response3.json();
      //console.log(data2.friends);
      localStorage.setItem('friends', JSON.stringify(data2.friends));
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('all', JSON.stringify(data3.users));
      console.log(data3.all);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Enter your email"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              required 
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="Enter your password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required 
            />
          </InputGroup>
          <LoginButton type="submit">Log In</LoginButton>
        </Form>
        <BackLink to="/">← Back to Home</BackLink>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage; 