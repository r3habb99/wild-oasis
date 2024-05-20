import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button
        variation="primary"
        size="large"
        onClick={() => setIsOpenModel((show) => !show)}
      >
        Add new Cabin
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
