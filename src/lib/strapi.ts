interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  console.log('Fetching from Strapi:', url.toString());
  const allData: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const paginatedUrl = new URL(url.toString());
    paginatedUrl.searchParams.set('pagination[page]', page.toString());
    paginatedUrl.searchParams.set('pagination[pageSize]', '25');
    
    const res = await fetch(paginatedUrl.toString());
    const response = await res.json();
    console.log('Response from Strapi:', res);
    if (response.data && response.data.length > 0) {
      allData.push(...response.data);
      page++;
      
      // Check if there are more pages
      const pagination = response.meta?.pagination;
      hasMore = pagination && page <= pagination.pageCount;
    } else {
      hasMore = false;
    }
  }

  // Create a mock response object for the existing logic
  const res = { json: async () => ({ data: allData }) };

  let data: any = await res.json();
  console.log('All data fetched from Strapi:', data);
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  console.log('Data fetched from Strapi:', data);

  return data as T;
}