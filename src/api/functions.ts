import {
    Account,
    AnyNumber,
    MoveObjectType,
    MoveAddressType,
    Network,
    NetworkToNetworkName,
    AptosConfig,
    Aptos,
} from "@aptos-labs/ts-sdk";
import { RENA_MODULE_TESTNET } from "../util/module-endpoints";

// Setup the client
const APTOS_NETWORK: Network = process.env.APTOS_NETWORK
  ? NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.TESTNET
  : Network.TESTNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

/**
 * Class for interracting with entry functions from core.move
 * only claim and liquify are implemented
 */
export class Functions {
  private async submitTransaction(
    account: Account,
    funcName: string,
    typeArgs: string[],
    args: any[],
  ) {
    const transaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${RENA_MODULE_TESTNET}::${funcName}`,
        typeArguments: typeArgs,
        functionArguments: args,
      },
    });

    const senderAuthenticator = aptos.transaction.sign({
      signer: account,
      transaction,
    });
    const pendingTxn = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator,
    });

    return pendingTxn.hash;
  }

  /**
   * Claim X amount of coins given X amount of tokens
   * @param sender The account owning the coins
   * @param coin_metadata_type The type of the liquid coin
   * @param coin_metadata The metadata object for the liquid coin
   * @param count The amount of tokens to claim
   */
  // :!:claim
  async claim(
    sender: Account,
    coin_metadata_type: MoveAddressType,
    coin_metadata: MoveObjectType,
    count: AnyNumber,
  ) {
    return this.submitTransaction(
      sender,
      "claim",
      [coin_metadata_type],
      [coin_metadata, count],
    );
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
    sender: Account,
    coin_metadata_type: MoveAddressType,
    coin_metadata: MoveObjectType,
    tokens: AnyNumber,
  ) {
    return this.submitTransaction(
      sender,
      "liquify",
      [coin_metadata_type],
      [coin_metadata, tokens],
    );
  }

}