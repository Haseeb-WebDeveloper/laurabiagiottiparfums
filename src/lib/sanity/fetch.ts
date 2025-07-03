import { client } from "./client";
import { type QueryParams } from 'next-sanity'

export const fetchSanityData = async <T>(
  query: string,
  params: QueryParams = {},
  options: { revalidate?: number } = {}
): Promise<T> => {
  return client.fetch(query, params, {
    ...options.revalidate && { next: { revalidate: options.revalidate } },
  })
}
