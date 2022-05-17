import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CoinList} from './pages/coins/components/CoinList';
import {CoinProvider} from './pages/coins/services/CoinsService';

function App() {
    return (
        <div className="App">
            <CoinProvider>
                <CoinList/>
            </CoinProvider>
        </div>
    );
}

export default App;
