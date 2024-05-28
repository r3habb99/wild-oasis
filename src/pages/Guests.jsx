import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestTable from '../features/guests/GuestsTable';
// import AddGuest from '../features/guests/AddGuest';
// import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
        {/* <BookingTableOperations /> */}
        {/* <AddGuest /> */}
      </Row>
      <GuestTable />
    </>
  );
}

export default Guests;
