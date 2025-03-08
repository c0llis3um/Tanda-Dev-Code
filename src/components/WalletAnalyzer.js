import React, { useState } from 'react';
import { getWalletDetails } from '../services/xummService';

const WalletAnalyzer = ({ walletAddress }) => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWallet = async () => {
    setLoading(true);
    try {
      const data = await getWalletDetails(walletAddress);
      setWalletData(data);
    } catch (error) {
      console.error('Failed to analyze wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={analyzeWallet} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Wallet'}
      </button>
      {walletData && (
        <div>
          <h3>Wallet Details</h3>
          <pre>{JSON.stringify(walletData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WalletAnalyzer;