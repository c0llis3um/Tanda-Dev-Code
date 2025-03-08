import { XummSdk } from 'xumm-sdk';

const apiKey = process.env.REACT_APP_XUMM_API_KEY;
const xumm = new XummSdk(apiKey);

export const authenticate = async () => {
  try {
    const auth = await xumm.authorize();
    return auth;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

export const getWalletDetails = async (walletAddress) => {
  try {
    const payload = await xumm.payload.create({
      txjson: {
        TransactionType: 'AccountInfo',
        Account: walletAddress,
      },
    });
    return payload;
  } catch (error) {
    console.error('Failed to fetch wallet details:', error);
    throw error;
  }
};