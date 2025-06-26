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
  //console.log('Fetching from Strapi:', url.toString());
  const res = await fetch(url.toString());
  //console.log('Response from Strapi:', res);
  let data = await res.json();
  console.log('All data fetched from Strapi:', data);
  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }
/*
  if (Array.isArray(data)) {
    data = data.map(item => ({
      ...item,
      content: item.blocks && item.blocks.length > 0 ? item.blocks[0].body : undefined,
    }));
  } else if (data && data.blocks && Array.isArray(data.blocks) && data.blocks.length > 0) {
    data.content = data.blocks[0].body;
  }
*/
  console.log('Data fetched from Strapi:', data);

  return data as T;
}