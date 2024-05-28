/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Table from '../../ui/Table';

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

function GuestRow({ guest: { id, fullName, email, nationalID, nationality } }) {
  return (
    <Table.Row>
      <Guest>{id}</Guest>
      <div>{fullName}</div>
      <div>{email}</div>

      <div>{nationalID}</div>
      <div>{nationality}</div>

      <div></div>
    </Table.Row>
  );
}

export default GuestRow;
