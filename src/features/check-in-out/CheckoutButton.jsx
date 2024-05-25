/* eslint-disable react/prop-types */
import Button from '../../ui/Button';
import { useCheckout } from './useCheckout.hook';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckOut } = useCheckout();
  return (
    <Button
      size="small"
      variation="danger"
      onClick={() => checkout(bookingId)}
      disabled={isCheckOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
