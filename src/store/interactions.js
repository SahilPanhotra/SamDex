import { ethers } from "ethers";
import {
  ACCOUNT_LOADED,
  ETHER_BALANCE_LOADED,
  NETWORK_LOADED,
  PROVIDER_LOADED,
} from "./slices/provider";
import TOKEN_ABI from "../abis/Token.json";
import EXCHANGE_ABI from "../abis/Exchange.json";
import {
  TOKEN_1_BALANCE_LOADED,
  TOKEN_1_LOADED,
  TOKEN_2_BALANCE_LOADED,
  TOKEN_2_LOADED,
} from "./slices/token";
import {
  EXCHANGE_LOADED,
  EXCHANGE_TOKEN_1_BALANCE_LOADED,
  EXCHANGE_TOKEN_2_BALANCE_LOADED,
  TRANSFER_FAIL,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
} from "./slices/exchange";

export const loadProvider = (dispatch) => {
  // Connect Ethers to blockchain
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(PROVIDER_LOADED({ connection }));

  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch(NETWORK_LOADED({ chainId }));

  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);

  dispatch(ACCOUNT_LOADED({ account }));

  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);

  dispatch(ETHER_BALANCE_LOADED({ balance }));

  return account;
};

export const loadTokens = async (provider, addresses, dispatch) => {
  let token, symbol;

  token = new ethers.Contract(addresses[0], TOKEN_ABI, provider);
  symbol = await token.symbol();
  dispatch(TOKEN_1_LOADED({ token, symbol }));

  token = new ethers.Contract(addresses[1], TOKEN_ABI, provider);
  symbol = await token.symbol();
  dispatch(TOKEN_2_LOADED({ token, symbol }));
  return token;
};

export const loadExchange = async (provider, address, dispatch) => {
  const exchange = new ethers.Contract(address, EXCHANGE_ABI, provider);
  dispatch(EXCHANGE_LOADED({ exchange }));

  return exchange;
};

export const subscribeToEvents = (exchange, dispatch) => {
  exchange.on("Deposit", (token, user, amount, balance, event) => {
    dispatch(TRANSFER_SUCCESS({ event }));
  });
  exchange.on("Withdraw", (token, user, amount, balance, event) => {
    dispatch(TRANSFER_SUCCESS({ event }));
  });
};

// ------------------------------------------------------------------------------
// LOAD USER BALANCES (WALLET & EXCHANGE BALANCES)

export const loadBalances = async (exchange, tokens, account, dispatch) => {
  let balance = ethers.utils.formatUnits(
    await tokens[0].balanceOf(account),
    18
  );
  dispatch(TOKEN_1_BALANCE_LOADED({ balance }));

  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[0].address, account),
    18
  );
  dispatch(EXCHANGE_TOKEN_1_BALANCE_LOADED({ balance }));

  balance = ethers.utils.formatUnits(await tokens[1].balanceOf(account), 18);
  dispatch(TOKEN_2_BALANCE_LOADED({ balance }));

  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[1].address, account),
    18
  );
  dispatch(EXCHANGE_TOKEN_2_BALANCE_LOADED({ balance }));
};

// ------------------------------------------------------------------------------
// TRANSFER TOKENS (DEPOSIT & WITHDRAWS)

export const transferTokens = async (
  provider,
  exchange,
  transferType,
  token,
  amount,
  dispatch
) => {
  let transaction;

  dispatch(TRANSFER_REQUEST());

  try {
    const signer = await provider.getSigner();
    const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);
    if (transferType === "Deposit") {
      transaction = await token
        .connect(signer)
        .approve(exchange.address, amountToTransfer);
      await transaction.wait();
      transaction = await exchange
        .connect(signer)
        .depositToken(token.address, amountToTransfer);
    } else {
      transaction = await exchange
        .connect(signer)
        .withdrawToken(token.address, amountToTransfer);
    }
    await transaction.wait();
  } catch (error) {
    dispatch(TRANSFER_FAIL());
  }
};
