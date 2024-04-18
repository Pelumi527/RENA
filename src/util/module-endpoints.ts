// Purpose: Contains the module endpoints, function names and coin endpoints for the Renegade Network

import { AccountAddressInput, Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

// module endpoints
export const RENA_MODULE_TESTNET = "0x30604f2c399982920606bb2074d9721191c07e24549405da04a3f49ce4457186::core";
export const RENA_PRESALE_TESTNET = "0x30604f2c399982920606bb2074d9721191c07e24549405da04a3f49ce4457186::presale";
export const RENA_MODULE_MAINNET = "<address>::core";
export const RENA_PRESALE_MODULE_MAINNET = "<address>::presale";

// entry functions
export const CLAIM = "claim";
export const LIQUIFY = "liquify";
export const CONTRIBUTE = "contribute";
export const LIQUIFY_WITH_ADDRESS = "liquify_rena";

// view functions
export const TREASURY_ADDRESS = "treasury_address";
export const START_TIME = "start_time";
export const END_TIME = "end_time";
export const REMAINING_TIME = "remaining_time";
export const IS_COMPLETED = "is_completed";
export const TOTAL_CONTRIBUTORS = "total_contributors";
export const TOTAL_RAISED_FUNDS = "total_raised_funds";
export const CONTRIBUTED_AMOUNT = "contributed_amount";
export const CONTRIBUTED_AMOUNT_FROM_ADDRESS = "contributed_amount_from_address";

// coin endpoints
export const RENA_COIN_TYPE_TESTNET = "0x30604f2c399982920606bb2074d9721191c07e24549405da04a3f49ce4457186::core::RenegadeCoin"
export const LIQUID_COIN_OBJECT_TESTNET = "0x54fd8e035f5d5b414fb83a68f0a8300957ca5956737075da4349fdab6d255e12"

export const COLLECTION_ID = "0xb41252d851df7e8a0dd940b3bccd85397eac0af40fe6e432fe2739dd2bd29e54"
export const COLLECTION_ADDRESS: AccountAddressInput = "0xb41252d851df7e8a0dd940b3bccd85397eac0af40fe6e432fe2739dd2bd29e54"
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const APTOS = new Aptos(aptosConfig);

export const ONE_RENEGADES = 100_000_000;