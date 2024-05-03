import { provider } from "../provider";
const coinGeckoHeaders = {
  "Content-Type": "application/json",
  method: "GET",
  "x-cg-pro-api-key": process.env.COIN_GECKO_API_KEY,
};

export const getCoinPrice = async (crypto: string, fiaat: string) => {
  try {
    const res = await provider.get(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${crypto}&vs_currency=${fiaat}`,
      coinGeckoHeaders
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
