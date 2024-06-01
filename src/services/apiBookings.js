import { PAGE_SIZE } from '../utils/constants';
import { handleError } from '../utils/errorHandler';
import { getToday } from '../utils/helpers';
import supabase from './supabase';


export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,cabins(name),guests(fullName,email)',
      { count: 'exact' }
    );

  // Apply filter
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // Apply sort
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

  // Apply pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  handleError(error, 'Load bookings');
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  handleError(error, 'Load booking');
  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at,totalPrice,extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  handleError(error, 'Load bookings after date');
  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  handleError(error, 'Load stays after date');
  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName,nationality,countryFlag)')
    .or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`)
    .order('created_at');

  handleError(error, 'Load today\'s activity');
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  handleError(error, 'Update booking');
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  handleError(error, 'Delete booking');
  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select();

  handleError(error, 'Create booking');
  return data[0];
}
