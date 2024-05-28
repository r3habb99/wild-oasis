import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from '../cabins/CreateCabinForm';

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
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
