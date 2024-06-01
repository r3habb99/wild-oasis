import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { handleError } from '../utils/errorHandler';


// Get a paginated list of guests
export async function getGuests({ page = 1, pageSize = PAGE_SIZE }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('guests')
    .select('*', { count: 'exact' })
    .range(from, to);

  handleError(error, 'Loading guests');

  return {
    data,
    count,
  };
}

// Add a new guest to the database
export async function addGuest(newGuest) {
  const { data, error } = await supabase
    .from('guests')
    .insert([newGuest])
    .select();

  handleError(error, 'Adding guest');

  return data[0];
}
