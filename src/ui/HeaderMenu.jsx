import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  font-size: 1.6rem;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <MenuItem>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </MenuItem>
      <MenuItem>
        <DarkModeToggle />
      </MenuItem>
      <MenuItem>
        <Logout />
      </MenuItem>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
