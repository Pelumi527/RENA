import {
    AccountAddress,
    Aptos,
    AptosConfig,
    GetEventsResponse,
} from "@aptos-labs/ts-sdk";
import { RENA_MODULE_TESTNET } from "../util/module-endpoints";

export class Events {
    private aptos: Aptos;

    constructor(config: AptosConfig) {
        this.aptos = new Aptos(config);
    }

    /**
     * Get the event for a collection created
     */
    // :!:CollectionCreated
    async getCollectionCreatedEvents(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const collectionCreatedEvent = 
            await this.aptos.getAccountEventsByEventType({
                accountAddress: args.account_address,
                eventType: `${RENA_MODULE_TESTNET}::CollectionCreated`,
                minimumLedgerVersion: 0,
            });

        return collectionCreatedEvent;
    }

    /**
     * Get the event for a liquid tokens created
     */
    // :!:LiquidTokensCreated
    async getLiquidTokensCreatedEvents(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const liquidTokensCreatedEvent = 
            await this.aptos.getAccountEventsByEventType({
                accountAddress: args.account_address,
                eventType: `${RENA_MODULE_TESTNET}::LiquidTokensCreated`,
                minimumLedgerVersion: 0,
            });

        return liquidTokensCreatedEvent;
    }

    /**
     * Get the event for a liquid coin created
     */
    // :!:LiquidCoinCreated
    async getLiquidCoinCreatedEvents(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const liquidCoinCreatedEvent = 
            await this.aptos.getAccountEventsByEventType({
                accountAddress: args.account_address,
                eventType: `${RENA_MODULE_TESTNET}::LiquidCoinCreated`,
                minimumLedgerVersion: 0,
            });

        return liquidCoinCreatedEvent;
    }
    
    /**
     * Get the event for a fee updated
     */
    // :!:FeeUpdated
    async getFeeUpdatedEvents(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const feeUpdatedEvent = 
            await this.aptos.getAccountEventsByEventType({
                accountAddress: args.account_address,
                eventType: `${RENA_MODULE_TESTNET}::FeeUpdated`,
                minimumLedgerVersion: 0,
            });

        return feeUpdatedEvent;
    }
}