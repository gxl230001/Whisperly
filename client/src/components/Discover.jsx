import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div`
  padding: 15px 20px;
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  flex: 1;
  text-align: center;
  background-color: ${props => props.active ? '#e8f5fe' : 'white'};
  
  &:hover {
    background-color: ${props => props.active ? '#e8f5fe' : '#f8f8f8'};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const SearchContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const UserCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const Discover = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container>
      <Sidebar>
        <TabContainer>
          <Tab onClick={() => navigate('/messages')}>Messages</Tab>
          <Tab active={true}>Discover</Tab>
        </TabContainer>
      </Sidebar>
      <MainContent>
        <SearchContainer>
          <SearchInput 
            placeholder="Search for new friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <UserGrid>
          {/* Add sample user cards here */}
          <UserCard>
            <h3>Sample User</h3>
            <p>Interests: Coding, Music</p>
            <button>Add Friend</button>
          </UserCard>
          {/* Add more user cards as needed */}
        </UserGrid>
      </MainContent>
    </Container>
  );
};

export default Discover; 