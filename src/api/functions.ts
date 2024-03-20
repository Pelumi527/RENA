import {
    AnyNumber,
    MoveAddressType,
} from "@aptos-labs/ts-sdk";
import { RENA_MODULE_TESTNET } from "../util/module-endpoints";
import { LIQUID_COIN_OBJECT_TESTNET, RENA_COIN_TYPE_TESTNET } from "../util/rena-coin-endpoints";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AccountInfo } from "@aptos-labs/wallet-adapter-core";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { signAndSubmitTransaction } = useWallet();

/**
 * Class for interracting with entry functions from core.move
 * only claim and liquify are implemented
 */
export class Functions {

  /**
   * Claim X amount of coins given X amount of tokens
   * @param sender The account owning the coins
   * @param coin_metadata_type The type of the liquid coin
   * @param coin_metadata The metadata object for the liquid coin
   * @param count The amount of tokens to claim
   */
  // :!:claim
  async claim(
    account: AccountInfo,
    count: AnyNumber,
  ) {
    if (account) {
      try {
        const res = await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: `${RENA_MODULE_TESTNET}::${"claim"}`,
            functionArguments: [LIQUID_COIN_OBJECT_TESTNET, count],
          }
        })
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Liquify X amount of tokens given X amount of coins
   * @param sender The account owning the tokens
   * @param coin_metadata_type The type of the liquid coin
   * @param coin_metadata The metadata object for the liquid coin
   * @param tokens The amount of tokens to liquify
   */
  // :!:liquify
  async liquify(
    account: AccountInfo,
    tokens: MoveAddressType[]
  ) {
    if (account) {
      try {
        const res = await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: `${RENA_MODULE_TESTNET}::${"liquify"}`,
            typeArguments: [RENA_COIN_TYPE_TESTNET],
            functionArguments: [LIQUID_COIN_OBJECT_TESTNET, tokens],
          }
        })
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

}