// Purpose: Contains the module endpoints, function names and coin endpoints for the Renegade Network

import { AccountAddressInput, Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

/**
 * 
 * TESTNET
 * 
 */

// module endpoints
export const RENA_MODULE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::core";
export const RENA_PRESALE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale";

// coin endpoints
export const RENA_COIN_TYPE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::core::RenegadeCoin";
// Liquid coin object
export const LIQUID_COIN_OBJECT_TESTNET =
  "0xd39cfb3b072b49b70c8b2090bf838d9d1f3d637012036464d0cd8dc5b07dbd78";

// Presale related: type arguments
export const PUBLIC_PRESALE =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale::Info";
export const WHITELISTED_PRESALE =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale::WhitelistInfo";



/**
 * 
 * MAINNET
 * 
 */

// module endpoints
export const RENA_PRESALE_MAINNET = "0x4ed27736e724e403f9b4645ffef0ae86fd149503f45b37c428ffabd7e46e5b05::core";

export const RENA_MODULE_MAINNET = "0x4ed27736e724e403f9b4645ffef0ae86fd149503f45b37c428ffabd7e46e5b05::core";
// Coin endpoint
export const RENA_COIN_TYPE_MAINNET = "0x4ed27736e724e403f9b4645ffef0ae86fd149503f45b37c428ffabd7e46e5b05::core::RenegadeCoin";
// Liquid coin object
export const LIQUID_COIN_OBJECT_MAINNET = "0xfc8d56201d24f63e82dfff5cca064d0754d3cce3cadeb4a1d242b3d81cda42ef";
// Collection address
export const COLLECTION_ADDRESS: AccountAddressInput =
  "0x42b36fc7193af0e745e5cc2e9c12179fe8ba5197321479675975bbc17b5f63e7";


  
/**
 *
 * Global config
 * 
 */

const aptosConfig = new AptosConfig({ network: Network.MAINNET });
export const APTOS = new Aptos(aptosConfig);

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
export const CONTRIBUTED_AMOUNT_FROM_ADDRESS =
  "contributed_amount_from_address";

export const COLLECTION_ID =
  "0x42b36fc7193af0e745e5cc2e9c12179fe8ba5197321479675975bbc17b5f63e7";

export const ONE_RENEGADES = 100_000_000;
