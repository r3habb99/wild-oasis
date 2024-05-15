import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The World Wise</Heading>
            <div>
              <Heading as="h2">Checked In and Out</Heading>
              <Button onClick={() => alert('You Checked In')}>Check In</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert('You Check Out')}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input
                type="number"
                placeholder="Number of Guest"
              />
              <Input
                type="number"
                placeholder="Number of Guest"
              />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
