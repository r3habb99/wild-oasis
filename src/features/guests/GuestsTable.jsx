// import BookingRow from '../bookings/BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useGuests } from './useGuests-hook';
import Spinner from '../../ui/Spinner';
import GuestRow from './GuestRow';
import Pagination from '../../ui/Pagination';

function GuestTable() {
  const { guests, isLoading, count } = useGuests();

  if (isLoading) return <Spinner />;
  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 2.4fr 2fr 1fr 2fr 3.2rem">
        <Table.Header>
          <div>Id</div>
          <div>Full Name</div>
          <div>Email</div>
          <div>National ID</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => (
            <GuestRow
              key={guest.id}
              guest={guest}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
