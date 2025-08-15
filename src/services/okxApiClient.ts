import { RestClient } from "okx-api";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const API_KEY = process.env.OKX_API_KEY;
const API_SECRET = process.env.OKX_API_SECRET;
const API_PASSPHRASE = process.env.OKX_API_PASSPHRASE;

if (!API_KEY || !API_SECRET || !API_PASSPHRASE) {
  throw new Error("OKX API credentials are not set in the .env file");
}

const client = new RestClient({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  apiPass: API_PASSPHRASE,
});

export class OkxApiClient {
  async getPortfolio() {
    try {
      const response = await client.getBalance();
      const details = response[0].details;
      const portfolio = [];

      for (const item of details) {
        const ccy = item.ccy;
        let usdtValue = 0;
        if (ccy !== "USDT") {
          try {
            const tickerResponse = await client.getTicker({
              instId: `${ccy}-USDT`,
            });
            if (tickerResponse.length > 0) {
              usdtValue = parseFloat(tickerResponse[0].last);
            }
          } catch (error) {
            // ignore errors for tickers that don't exist
          }
        }

        portfolio.push({
          currency: ccy,
          totalBalance: parseFloat(item.eq),
          availableBalance: parseFloat(item.availEq),
          frozenBalance: parseFloat(item.frozenBal),
          usdtValue:
            ccy === "USDT"
              ? parseFloat(item.eq)
              : parseFloat(item.eq) * usdtValue,
        });
      }
      return portfolio;
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      throw error;
    }
  }

  async getOpenOrders() {
    try {
      const response = await client.getOrderList();
      return response.map((order) => ({
        orderId: order.ordId,
        symbol: order.instId,
        type: order.ordType,
        price: parseFloat(order.px),
        amount: parseFloat(order.sz),
        side: order.side,
        status: order.state,
      }));
    } catch (error) {
      console.error("Error fetching open orders:", error);
      throw error;
    }
  }

  async getOrderHistory(instId: string, begin?: number, end?: number) {
    try {
      const response = await client.getOrderHistory({
        instType: "SPOT",
        instId,
        begin: begin?.toString(),
        end: end?.toString(),
      });
      return response.map((order) => ({
        orderId: order.ordId,
        symbol: order.instId,
        price: parseFloat(order.avgPx),
        amount: parseFloat(order.sz),
        side: order.side,
        realizedPnl: parseFloat(order.pnl),
      }));
    } catch (error) {
      console.error("Error fetching order history:", error);
      throw error;
    }
  }

  async getPositions() {
    try {
      const response = await client.getPositions();
      return response.map((position) => ({
        symbol: position.instId,
        size: parseFloat(position.pos),
        entryPrice: parseFloat(position.avgPx),
        unrealizedPnl: parseFloat(position.upl),
        margin: parseFloat(position.margin),
      }));
    } catch (error) {
      console.error("Error fetching positions:", error);
      throw error;
    }
  }

  async getAccountSummary() {
    try {
      const portfolio = await this.getPortfolio();
      const openOrders = await this.getOpenOrders();
      const positions = await this.getPositions();

      const totalValueUsdt = portfolio.reduce(
        (acc, item) => acc + item.usdtValue,
        0
      );
      const allocation = portfolio.map((item) => ({
        currency: item.currency,
        allocation: item.usdtValue / totalValueUsdt,
      }));

      return {
        totalPortfolioValueUSDT: totalValueUsdt,
        allocationByAsset: allocation,
        numberOfOpenOrders: openOrders.length,
        numberOfOpenPositions: positions.length,
      };
    } catch (error) {
      console.error("Error fetching account summary:", error);
      throw error;
    }
  }
}
