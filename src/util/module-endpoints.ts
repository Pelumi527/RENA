// Purpose: Contains the module endpoints, function names and coin endpoints for the Renegade Network

import { AccountAddressInput, Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

// module endpoints
export const RENA_MODULE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::core";
export const RENA_PRESALE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale";
export const RENA_MODULE_MAINNET = "<address>::core";
export const RENA_PRESALE_MODULE_MAINNET = "<address>::presale";

// type arguments
export const PUBLIC_PRESALE =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale::Info";
export const WHITELISTED_PRESALE =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::presale::WhitelistInfo";

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

// coin endpoints
export const RENA_COIN_TYPE_TESTNET =
  "0x9d96f1762f4993964668d7a89c20fe10e0978bac92a1c1c839b2da5005096867::core::RenegadeCoin";
export const LIQUID_COIN_OBJECT_TESTNET =
  "0xd39cfb3b072b49b70c8b2090bf838d9d1f3d637012036464d0cd8dc5b07dbd78";

export const COLLECTION_ID =
  "0x7c25742cd2cfd0c2bd171b775edcda3e89e4af9d7eedd13312afddcc189a495f";
export const COLLECTION_ADDRESS: AccountAddressInput =
  "0x7c25742cd2cfd0c2bd171b775edcda3e89e4af9d7eedd13312afddcc189a495f";
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const APTOS = new Aptos(aptosConfig);

export const ONE_RENEGADES = 100_000_000;
