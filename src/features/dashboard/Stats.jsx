/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1. Total Bookings
  const numBookings = bookings.length;
  //2. Total Sales
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  //3. Total Check-ins
  const checkins = confirmedStays.length;
  //4. Total Occupancy rates
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
