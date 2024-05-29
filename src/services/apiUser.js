import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getGuests({ page, pageSize = PAGE_SIZE }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('guests')
    .select('*', { count: 'exact' })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data,
    count,
  };
}

export async function addGuest(newGuest) {
  const { data, error } = await supabase
    .from('guests')
    .insert([{ ...newGuest }])
    .select();
  if (error) throw new Error(error.message);

  return data[0];
}