import styled from "styled-components";
import { useDarkMode } from '../context/DarkMode-context';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 7.2rem;
  }

  @media (max-width: 480px) {
    height: 5.6rem;
  }
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';
  return (
    <StyledLogo>
      <Img
        src={src}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
