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
     * Get the events for a given account
     */
    // :!:CollectionCreated


    // :!:LiquidTokensCreated

    // :!:LiquidCoinCreated
    
    // :!:FeeUpdated
}