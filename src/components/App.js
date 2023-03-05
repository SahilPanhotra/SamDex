import config from "../config.json";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange,
  subscribeToEvents,
  loadAllOrders,
} from "../store/interactions";
import Navbar from "./Navbar";
import Markets from "./Markets";
import Balance from "./Balance";
import Order from "./Order";
import OrderBook from "./OrderBook";
import PriceChart from "./PriceChart";
import Trades from "./Trades";
import Transactions from "./Transactions";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    //connect ethers to blockchain
    const provider = loadProvider(dispatch);

    //fetch current networks chainId
    const chainId = await loadNetwork(provider, dispatch);
    //reload when chain changed
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    //fetch current account and balance from metamask
    window.ethereum.on("accountsChanged", async () => {
      await loadAccount(provider, dispatch);
    });
    //load token smart contract
    const Sam = config[chainId].Sam;
    const mETH = config[chainId].mETH;
    await loadTokens(provider, [Sam.address, mETH.address], dispatch);

    //load exchange contract
    const exchangeConfig = config[chainId].exchange;
    const exchange = await loadExchange(
      provider,
      exchangeConfig.address,
      dispatch
    );
    //fetch all orders:open ,filled,cancelled
    loadAllOrders(provider, exchange, dispatch);
    //subscribe to blockchain events
    subscribeToEvents(exchange, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <div>
      <Navbar />

      <main className="exchange grid">
        <section className="exchange__section--left grid">
          <Markets />

          <Balance />

          <Order />
        </section>
        <section className="exchange__section--right grid">
          <PriceChart />

          <Transactions />

          <Trades />

          <OrderBook />
        </section>
      </main>

      {/* Alert */}
    </div>
  );
}

export default App;
