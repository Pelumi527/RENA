import {
    AccountAddress,
    Aptos,
    AptosConfig,
    GetEventsResponse,
    Hex,
} from "@aptos-labs/ts-sdk";
import { RENA_MODULE_TESTNET } from "../util/module-endpoints";

export const OWNED_RENA_NFTS_QUERY = 
`query getTokenOwnedFromCollection($collection_name:String!, $owner_address: AccountAddress!) {
    current_token_ownerships_v2(where: {collection_name: {eq: $collection_name}, owner_address: {eq: $owner_address}}) {
        owner_address
        last_transaction_version
        last_transaction_timestamp
        current_token_data {
            collection_id
            token_name
            token_uri
            current_collection {
                collection_id
                collection_name
                creator_address
                current_supply
                description
                max_supply
                uri
            }
        }
    }
}`;

export type NFTResponse = {
    owner_address: AccountAddress;
    last_transaction_version: number;
    last_transaction_timestamp: number;
    current_token_data: {
        collection_id: AccountAddress;
        token_name: string;
        token_uri: string;
        current_collection: {
            collection_id: AccountAddress;
            collection_name: string;
            creator_address: AccountAddress;
            current_supply: number;
            description: string;
            max_supply: number;
            uri: string;
        }
    }
};

type NFTIndexerResponse = {
    current_token_ownerships_v2: Array<NFTResponse>
};

export class Queries {
    readonly provider: Aptos;

    constructor(provider: Aptos) {
        this.provider = provider
    }



    /**
     * Gets all Renegades NFTs owned by the connected account
     */
    // :!:GetRenegades
    async getRenegadesNFTs(
        account_address: AccountAddress
    ): Promise<Array<NFTResponse>> {
        const variables = {
            collection_name: "Renegades",
            owner_address: account_address
        };
        const response: NFTIndexerResponse = await this.queryIndexer(
            OWNED_RENA_NFTS_QUERY,
            variables
        );
        const nfts: NFTResponse[] = [];
        for(const nft of response.current_token_ownerships_v2) {
            nfts.push(
                {
                    owner_address: nft.owner_address,
                    last_transaction_version: nft.last_transaction_version,
                    last_transaction_timestamp: nft.last_transaction_timestamp,
                    current_token_data: {
                        collection_id: nft.current_token_data.collection_id,
                        token_name: nft.current_token_data.token_name,
                        token_uri: nft.current_token_data.token_uri,
                        current_collection: {
                            collection_id: nft.current_token_data.current_collection.collection_id,
                            collection_name: nft.current_token_data.current_collection.collection_name,
                            creator_address: nft.current_token_data.current_collection.creator_address,
                            current_supply: nft.current_token_data.current_collection.current_supply,
                            description: nft.current_token_data.current_collection.description,
                            max_supply: nft.current_token_data.current_collection.max_supply,
                            uri: nft.current_token_data.current_collection.uri
                        }
                    }
                }
            );
        }
        return nfts;
    }

    async queryIndexer<T extends {}>(query: string, variables?: {}): Promise<T> {
        const graphqlQuery = {
          query,
          variables,
        };
        return this.provider.queryIndexer<T>({
          query: graphqlQuery,
        });
      }

}
