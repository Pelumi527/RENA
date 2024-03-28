import {
    AccountAddress,
    Aptos,
    AptosConfig,
    GetEventsResponse,
} from "@aptos-labs/ts-sdk";
import { RENA_MODULE_TESTNET, RENA_PRESALE_MODULE_TESTNET } from "../util/module-endpoints";

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
            await this.aptos.getModuleEventsByEventType({
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
            await this.aptos.getModuleEventsByEventType({
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
            await this.aptos.getModuleEventsByEventType({
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
            await this.aptos.getModuleEventsByEventType({
                eventType: `${RENA_MODULE_TESTNET}::FeeUpdated`,
                minimumLedgerVersion: 0,
            });

        return feeUpdatedEvent;
    }

    /**
     * Get all claim events
     */
    // :!:AllClaim
    async getAllClaimEvents(): Promise<GetEventsResponse> {
        const allClaimsEvent = 
            await this.aptos.getModuleEventsByEventType({
                eventType: `${RENA_MODULE_TESTNET}::Claimed`,
                minimumLedgerVersion: 0,
            });

        return allClaimsEvent;
    }

    /**
     * Get all liquify events
     */
    // :!:AllLiquify
    async getAllLiquifyEvents(): Promise<GetEventsResponse> {
        const allLiquifyEvent = 
            await this.aptos.getModuleEventsByEventType({
                eventType: `${RENA_MODULE_TESTNET}::Liquified`,
                minimumLedgerVersion: 0,
            });

        return allLiquifyEvent;
    }
    

    /**
     * Get the events for claim for an account
     */
    // :!:Claim
    async getClaimEventsForAccountAddress(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const claimEvent = 
            await this.aptos.getAccountEventsByEventType({
                eventType: `${RENA_MODULE_TESTNET}::Claimed`,
                minimumLedgerVersion: 0,
                accountAddress: args.account_address,
            });

        return claimEvent;
    }

    /**
     * Get the events for liquify for an account
     */
    // :!:Liquify
    async getLiquifyEventsForAccountAddress(args: {
        account_address: AccountAddress;
    }): Promise<GetEventsResponse> {
        const liquifyEvent = 
            await this.aptos.getAccountEventsByEventType({
                eventType: `${RENA_MODULE_TESTNET}::Liquified`,
                minimumLedgerVersion: 0,
                accountAddress: args.account_address,
            });

        return liquifyEvent;
    }

    /**
     * Get the event for a pre-sale created
     */
    // :!:PresaleCreated
    async getPresaleCreatedEvent(): Promise<GetEventsResponse> {
        const preSaleCreatedEvent = 
            await this.aptos.getModuleEventsByEventType({
                eventType: `${RENA_PRESALE_MODULE_TESTNET}::PresaleInitialized`,
                minimumLedgerVersion: 0,
            });

        return preSaleCreatedEvent;
    }



}