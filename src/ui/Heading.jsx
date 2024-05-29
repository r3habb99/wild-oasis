import styled, {css} from 'styled-components';

const Heading = styled.h1`
  line-height: 1.4;

  ${(props) =>
    props.as === 'h1' &&
    css`
      font-weight: 600;
      font-size: 3rem;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 2.5rem;
      }

      @media (max-width: 480px) {
        font-size: 2rem;
      }
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-weight: 600;
      font-size: 2.5rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }

      @media (max-width: 480px) {
        font-size: 1.8rem;
      }
    `}

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-weight: 500;
      font-size: 2rem;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }

      @media (max-width: 480px) {
        font-size: 1.6rem;
      }
    `}

  ${(props) =>
    props.as === 'h4' &&
    css`
      font-weight: 600;
      font-size: 1.8rem;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }

      @media (max-width: 480px) {
        font-size: 1.4rem;
      }
    `}
`;


export default Heading;
