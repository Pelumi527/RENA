export const operationsDoc = `
  query MyQuery($collectionId: String!, $ownerAddress: String!) {
    current_token_datas_v2(
      where: {
        current_collection: {
          collection_id: {_eq: $collectionId}
        },
        current_token_ownership: {
          owner_address: {_eq: $ownerAddress}
        }
      }
    ) {
      current_token_ownership {
        owner_address
      }
      token_name
      token_uri
      token_data_id
    }
  }
`;