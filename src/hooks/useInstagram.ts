import useSWR from 'swr';
import { InstagramApiResponse } from '@/types/insta-post';

const fetcher = (url: string): Promise<InstagramApiResponse> => 
  fetch(url).then(res => res.json());

export function useInstagram(limit: number = 4, refreshInterval: number = 300000) {
  const { data, error, isLoading, mutate } = useSWR<InstagramApiResponse>(
    `/api/instagram/posts?limit=${limit}`,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    posts: data?.posts || [],
    isLoading,
    error,
    refresh: mutate,
  };
}
