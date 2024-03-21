export const fetchGraphQL = async (
  operationsDoc: string,
  operationName: string,
  variables: object
) => {
  const result = await fetch(process.env.REACT_APP_API_URL!, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      apikey: process.env.REACT_APP_API_KEY!,
    },
  });
  return await result.json();
}