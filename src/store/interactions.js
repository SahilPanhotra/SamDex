import { ethers } from "ethers";
import {
  ACCOUNT_LOADED,
  NETWORK_LOADED,
  PROVIDER_LOADED
} from "./slices/provider";
import TOKEN_ABI from '../abis/Token.json';
import { TOKEN_LOADED } from "./slices/token";


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

export const loadAccount = async (dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);

  dispatch(ACCOUNT_LOADED({ account }));

  return account;
};

export const loadToken = async (provider, address, dispatch) => {
  let token, symbol;

  token = new ethers.Contract(address, TOKEN_ABI, provider);
  symbol = await token.symbol();
  dispatch(TOKEN_LOADED({ token, symbol }));

  return token;
};
