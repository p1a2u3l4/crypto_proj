import './App.css';
import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import { CryptoContextProvider } from './context/context-crypto';

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>

  );
}

export default App;
