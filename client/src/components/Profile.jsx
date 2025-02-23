import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEdit, FaCheck } from 'react-icons/fa';
import defaultPfp from '../assets/images/pfp.png';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0.8rem;
  max-width: 500px;
  margin: 0 auto;
`;

const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid #8CC0DE;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 0.5rem;

  &:hover .overlay {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const UploadButton = styled.button`
  background: #8CC0DE;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background: #7AB2D0;
    transform: scale(1.05);
  }
`;

const InfoSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const InfoField = styled.div`
  background: #F8F9FF;
  padding: 0.6rem;
  border-radius: 8px;
  border-left: 3px solid #8CC0DE;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #8CC0DE;
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: ${props => props.editing ? '2px solid #8CC0DE' : 'none'};
  background: ${props => props.editing ? 'white' : 'transparent'};
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #2B4865;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.4rem;
  border: ${props => props.editing ? '2px solid #8CC0DE' : 'none'};
  background: ${props => props.editing ? 'white' : 'transparent'};
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #2B4865;
  min-height: 60px;
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'whiskers@pawmail.com',
    age: '24',
    mentalHealth: 'Anxiety, Depression',
    bio: 'Just a cat person living in a dog world 🐱',
    interests: 'Cats, Coffee, Coding'
  });

  const [editing, setEditing] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const handleEdit = (field) => {
    setEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderField = (field, label, isTextArea = false) => (
    <InfoField>
      <Label>
        {label}
        <EditButton onClick={() => handleEdit(field)}>
          {editing[field] ? <FaCheck /> : <FaEdit />}
        </EditButton>
      </Label>
      {isTextArea ? (
        <TextArea
          value={profileData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          disabled={!editing[field]}
          editing={editing[field]}
        />
      ) : (
        <Input
          value={profileData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          disabled={!editing[field]}
          editing={editing[field]}
          type={field === 'age' ? 'number' : 'text'}
        />
      )}
    </InfoField>
  );

  return (
    <ProfileContainer>
      <ProfileImageSection>
        <ImageContainer>
          <ProfileImage 
            src={profileImage || defaultPfp} 
            alt="Profile" 
          />
          <ImageOverlay className="overlay">
            <label htmlFor="imageUpload">
              <UploadButton>Change Photo</UploadButton>
            </label>
          </ImageOverlay>
        </ImageContainer>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </ProfileImageSection>

      <InfoSection>
        {renderField('name', 'Name')}
        {renderField('email', 'Email')}
        {renderField('age', 'Age')}
        {renderField('mentalHealth', 'Mental Health', true)}
        {renderField('bio', 'Bio', true)}
        {renderField('interests', 'Interests')}
      </InfoSection>
    </ProfileContainer>
  );
};

export default Profile; 