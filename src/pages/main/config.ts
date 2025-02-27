export const configBinance = {
  name: 'Binance',
  params: { interval: '1d', limit: 100, symbol: 'BTCUSDT' },
  url: `https://api.binance.com/api/v3/klines`,
};

export const configMobula = {
  name: 'Mobula',
  params: { amount: 100, asset: 'Bitcoin', period: '1d' },
  url: `https://production-api.mobula.io/api/1/market/history/pair`,
};

export const configChart = [
  { name: 'Basic line' },
  { name: 'Smoothed line' },
  { name: 'Basic area' },
  { name: 'Basic bar' },
];
