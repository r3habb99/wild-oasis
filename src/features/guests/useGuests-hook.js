import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiUser';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const {
    isLoading,
    data: guestsData,
    error,
  } = useQuery({
    queryKey: ['guests', page],
    queryFn: () => getGuests({ page, pageSize: PAGE_SIZE }),
  });

  // Ensure guestsData is correctly structured
  const guests = guestsData?.data || [];
  const count = guestsData?.count || 0;

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['guests', page + 1],
      queryFn: () => getGuests({ page: page + 1, pageSize: PAGE_SIZE }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['guests', page - 1],
      queryFn: () => getGuests({ page: page - 1, pageSize: PAGE_SIZE }),
    });
  }

  return { isLoading, guests, error, count };
}
