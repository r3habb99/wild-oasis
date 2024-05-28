import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import NewBookingForm from '../bookings/NewBookingForm';

function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="newGuest-form">
          <Button
            variation="primary"
            size="medium"
          >
            Add New Guest
          </Button>
        </Modal.Open>
        <Modal.Window name="newGuest-form">
          <NewBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
