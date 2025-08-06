import useSWR from 'swr';
import { InstagramStats } from '@/types/insta-post';

const fetcher = (url: string): Promise<InstagramStats> => 
  fetch(url).then(res => res.json());

export function useInstagramStats(refreshInterval: number = 3600000) { // 1 hour
  const { data, error, isLoading } = useSWR<InstagramStats>(
    '/api/instagram/stats',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data,
    isLoading,
    error,
  };
}
