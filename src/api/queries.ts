import {
  AccountAddress,
  AccountAddressInput,
  Aptos,
  AptosConfig,
  GetEventsResponse,
  Hex,
} from "@aptos-labs/ts-sdk";
import {
  COLLECTION_ADDRESS,
  COLLECTION_ID,
  RENA_MODULE_MAINNET,
} from "../util/module-endpoints";

type TokenResponse = {
  amount: any;
  current_token_data?: null | {
    collection_id: string;
    current_collection?: null | {
      collection_id: string;
      collection_name: string;
      creator_address: string;
      current_supply: any;
      description: string;
      last_transaction_timestamp: any;
      last_transaction_version: any;
      max_supply?: any;
      mutable_description?: null | boolean;
      mutable_uri?: null | boolean;
      table_handle_v1?: null | string;
      token_standard: string;
      total_minted_v2?: any;
      uri: string;
    };
    decimals: any;
    description: string;
    is_fungible_v2?: null | boolean;
    largest_property_version_v1?: any;
    last_transaction_timestamp: any;
    last_transaction_version: any;
    maximum?: any;
    supply: any;
    token_data_id: string;
    token_name: string;
    token_properties: any;
    token_standard: string;
    token_uri: string;
  };
  is_fungible_v2?: null | boolean;
  is_soulbound_v2?: null | boolean;
  last_transaction_timestamp: any;
  last_transaction_version: any;
  owner_address: string;
  property_version_v1: any;
  storage_id: string;
  table_type_v1?: null | string;
  token_data_id: string;
  oken_properties_mutated_v1?: any;
  token_standard: string;
};

// export const OWNED_RENA_NFTS_QUERY =
// `query getTokenOwnedFromCollection($collection_name:String!, $owner_address: AccountAddress!) {
//     current_token_ownerships_v2(where: {collection_name: {eq: $collection_name}, owner_address: {eq: $owner_address}}) {
//         owner_address
//         last_transaction_version
//         last_transaction_timestamp
//         current_token_data {
//             collection_id
//             token_name
//             token_uri
//             current_collection {
//                 collection_id
//                 collection_name
//                 creator_address
//                 current_supply
//                 description
//                 max_supply
//                 uri
//             }
//         }
//     }
// }`;

// export type NFTResponse = {
//     owner_address: AccountAddress;
//     last_transaction_version: number;
//     last_transaction_timestamp: number;
//     current_token_data: {
//         collection_id: AccountAddress;
//         token_name: string;
//         token_uri: string;
//         current_collection: {
//             collection_id: AccountAddress;
//             collection_name: string;
//             creator_address: AccountAddress;
//             current_supply: number;
//             description: string;
//             max_supply: number;
//             uri: string;
//         }
//     }
// };

// type NFTIndexerResponse = {
//     current_token_ownerships_v2: Array<NFTResponse>
// };

export class Queries {
  private aptos: Aptos;

  constructor(config: AptosConfig) {
    this.aptos = new Aptos(config);
  }

  /**
   * Gets all Renegades NFTs owned by the connected account
   */
  // :!:GetRenegades
  async getRenegadesNFTs(
    accountAddress: AccountAddressInput,
    // collectionAddress: AccountAddressInput
  ): Promise<Array<TokenResponse>> {
    const response =
      await this.aptos.getAccountOwnedTokensFromCollectionAddress({
        accountAddress,
        // collectionAddress
        collectionAddress: COLLECTION_ADDRESS,
      });

    return response;
  }
  // /**
  //  * Gets all Renegades NFTs owned by the connected account
  //  */
  // // :!:GetRenegades
  // async getRenegadesNFTs(
  //     account_address: AccountAddress
  // ): Promise<Array<NFTResponse>> {
  //     const variables = {
  //         collection_name: "Renegades",
  //         owner_address: account_address
  //     };
  //     const response: NFTIndexerResponse = await this.queryIndexer(
  //         OWNED_RENA_NFTS_QUERY,
  //         variables
  //     );
  //     const nfts: NFTResponse[] = [];
  //     for(const nft of response.current_token_ownerships_v2) {
  //         nfts.push(
  //             {
  //                 owner_address: nft.owner_address,
  //                 last_transaction_version: nft.last_transaction_version,
  //                 last_transaction_timestamp: nft.last_transaction_timestamp,
  //                 current_token_data: {
  //                     collection_id: nft.current_token_data.collection_id,
  //                     token_name: nft.current_token_data.token_name,
  //                     token_uri: nft.current_token_data.token_uri,
  //                     current_collection: {
  //                         collection_id: nft.current_token_data.current_collection.collection_id,
  //                         collection_name: nft.current_token_data.current_collection.collection_name,
  //                         creator_address: nft.current_token_data.current_collection.creator_address,
  //                         current_supply: nft.current_token_data.current_collection.current_supply,
  //                         description: nft.current_token_data.current_collection.description,
  //                         max_supply: nft.current_token_data.current_collection.max_supply,
  //                         uri: nft.current_token_data.current_collection.uri
  //                     }
  //                 }
  //             }
  //         );
  //     }
  //     return nfts;
  // }

  // async queryIndexer<T extends {}>(query: string, variables?: {}): Promise<T> {
  //     const graphqlQuery = {
  //       query,
  //       variables,
  //     };
  //     return this.provider.queryIndexer<T>({
  //       query: graphqlQuery,
  //     });
  //   }
}
