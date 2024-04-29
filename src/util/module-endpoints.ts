// Purpose: Contains the module endpoints, function names and coin endpoints for the Renegade Network

import { AccountAddressInput, Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

// module endpoints
export const RENA_MODULE_TESTNET = "0xba092add8ca6e1291319c2f60da6542ff97261a235632cff4eb1de1076f670fc::core";
export const RENA_PRESALE_TESTNET = "0xba092add8ca6e1291319c2f60da6542ff97261a235632cff4eb1de1076f670fc::presale";
export const RENA_MODULE_MAINNET = "<address>::core";
export const RENA_PRESALE_MODULE_MAINNET = "<address>::presale";

// type arguments
export const PUBLIC_PRESALE = "0xba092add8ca6e1291319c2f60da6542ff97261a235632cff4eb1de1076f670fc::presale::Info";
export const WHITELISTED_PRESALE = "0xba092add8ca6e1291319c2f60da6542ff97261a235632cff4eb1de1076f670fc::presale::whitelistInfo";

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
export const RENA_COIN_TYPE_TESTNET = "0xba092add8ca6e1291319c2f60da6542ff97261a235632cff4eb1de1076f670fc::core::RenegadeCoin"
export const LIQUID_COIN_OBJECT_TESTNET = "0x1783ac93f471488b3db1737b970b2e00f410d2f06c1629429808877ff04f231d"

export const COLLECTION_ID = "0xecacb27057d539555f6b1313e480963bddfab8cd659d73f17705cba6c7ae454b"
export const COLLECTION_ADDRESS: AccountAddressInput = "0xecacb27057d539555f6b1313e480963bddfab8cd659d73f17705cba6c7ae454b"
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const APTOS = new Aptos(aptosConfig);

export const ONE_RENEGADES = 100_000_000;