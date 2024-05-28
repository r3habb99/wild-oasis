import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../services/apiUser';

export function useGuests() {
  const { isLoading, data: guests = {} } = useQuery({
    queryKey: ['guests'],
    queryFn: getGuests,
  });

  return { isLoading, guests };
}
