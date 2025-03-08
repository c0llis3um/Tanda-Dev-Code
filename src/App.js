import React, { useState } from 'react';
import Login from './components/Login';
import WalletAnalyzer from './components/WalletAnalyzer';

const App = () => {
  const [auth, setAuth] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const handleLogin = (authData) => {
    setAuth(authData);
    setWalletAddress(authData.me.account); // Assuming authData contains wallet address
  };

  return (
    <div>
      <h1>Wallet Analyzer</h1>
      {!auth ? (
        <Login onLogin={handleLogin} />
      ) : (
        <WalletAnalyzer walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default App;