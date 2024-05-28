import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import NewBookingForm from './NewBookingForm';

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="newbooking-form">
          <Button
            variation="primary"
            size="medium"
          >
            Add New Booking
          </Button>
        </Modal.Open>
        <Modal.Window name="newbooking-form">
          <NewBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
