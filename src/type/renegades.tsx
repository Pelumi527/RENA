export interface NFTtype {
    collection_id: string;
    current_collection: {
      collection_id: string;
      collection_name: string;
      creator_address: string;
      current_supply: number;
      description: string;
    };
    description: string;
    token_data_id: string;
    token_name: string;
    token_uri: string;
  }