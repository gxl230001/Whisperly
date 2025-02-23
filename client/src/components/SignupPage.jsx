import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #E0F4FF 0%, #B9E7FF 100%);
  padding: 2rem;
`;

const SignupBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
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

const Row = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
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

const Select = styled.select`
  padding: 0.8rem;
  border: 2px solid #E0F4FF;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #8CC0DE;
  }
`;

const SignupButton = styled.button`
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

const SuccessMessage = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// New styled components for mental health conditions section
const ConditionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HelperText = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #666;
  font-size: 0.8rem;
  margin-top: -0.3rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-family: 'Poppins', sans-serif;
  color: #256D85;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    mentalDisorders: []
  });
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const conditions = [
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'depression', label: 'Depression' },
    { id: 'adhd', label: 'ADHD' },
    { id: 'autism', label: 'Autism' },
    { id: 'ocd', label: 'OCD' },
    { id: 'ptsd', label: 'PTSD' },
    { id: 'dyslexia', label: 'Dyslexia' },
    { id: 'psychotic', label: 'Psychotic Disorders' },
    { id: 'eating', label: 'Eating Disorder' },
    { id: 'personality', label: 'Personality Disorder' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleConditionToggle = (conditionId) => {
    setFormData(prevState => {
      const conditions = [...prevState.mentalDisorders];
      const index = conditions.indexOf(conditionId);
      
      if (index === -1) {
        conditions.push(conditionId);
      } else {
        conditions.splice(index, 1);
      }

      return {
        ...prevState,
        mentalDisorders: conditions
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
      if (key === 'mentalDisorders') return true; // Optional field
      return value !== '';
    });
    
    if (allFieldsFilled) {
      setIsSignupSuccess(true);
    }
  };

  return (
    <SignupContainer>
      <SignupBox>
        <Title>Create Account</Title>
        {isSignupSuccess && (
          <SuccessMessage>
            Account successfully created! You can now log in.
          </SuccessMessage>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Row>
          
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </Select>
          </InputGroup>

          <ConditionsGroup>
            <Label>Mental Health Conditions (Optional)</Label>
            <HelperText>
              Select any conditions you're comfortable sharing. This information helps us provide better support.
            </HelperText>
            <CheckboxGrid>
              {conditions.map((condition) => (
                <CheckboxWrapper key={condition.id}>
                  <Checkbox
                    type="checkbox"
                    id={condition.id}
                    checked={formData.mentalDisorders.includes(condition.id)}
                    onChange={() => handleConditionToggle(condition.id)}
                  />
                  <CheckboxLabel htmlFor={condition.id}>
                    {condition.label}
                  </CheckboxLabel>
                </CheckboxWrapper>
              ))}
            </CheckboxGrid>
          </ConditionsGroup>
          
          <SignupButton type="submit">
            Create Account
          </SignupButton>
        </Form>
        {isSignupSuccess ? (
          <BackLink to="/login">← Go to Login</BackLink>
        ) : (
          <BackLink to="/">← Back to Home</BackLink>
        )}
      </SignupBox>
    </SignupContainer>
  );
};

export default SignupPage;