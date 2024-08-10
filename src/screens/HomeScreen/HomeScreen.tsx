import { Text } from 'react-native';
import { Container } from 'components/Container';
import { useGetAllTypesTodayQuery } from 'services/onthisday/onThisDayApi';

const HomeScreen = () => {
  return (
    <Container>
      <Text>Home!</Text>
    </Container>
  );
};

export default HomeScreen;
