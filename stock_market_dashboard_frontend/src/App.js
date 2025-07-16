import React, { useState, useEffect } from 'react';
import './App.css';

// Dummy data for stocks and portfolio
const DUMMY_GAINERS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 184.16, change: 2.53, changePct: 1.39 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 936.50, change: 21.34, changePct: 2.33 },
  { symbol: "META", name: "Meta Platforms", price: 475.28, change: 6.71, changePct: 1.44 },
  { symbol: "AMZN", name: "Amazon.com", price: 189.05, change: 3.23, changePct: 1.74 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 189.99, change: 4.20, changePct: 2.26 },
];
const DUMMY_LOSERS = [
  { symbol: "IBM", name: "IBM", price: 157.25, change: -2.85, changePct: -1.78 },
  { symbol: "INTC", name: "Intel Corp.", price: 31.75, change: -1.20, changePct: -3.64 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 618.17, change: -8.53, changePct: -1.36 },
  { symbol: "CRM", name: "Salesforce Inc.", price: 263.00, change: -2.11, changePct: -0.80 },
  { symbol: "PYPL", name: "PayPal Holdings", price: 61.15, change: -1.12, changePct: -1.80 },
];
const DUMMY_PORTFOLIO = [
  { symbol: "AAPL", shares: 10, avgCost: 160.00, currPrice: 184.16 },
  { symbol: "NVDA", shares: 5, avgCost: 550.00, currPrice: 936.50 },
  { symbol: "AMZN", shares: 3, avgCost: 180.00, currPrice: 189.05 },
];

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  // For demonstration: Assume first nav item is selected (Dashboard)
  const [navSelected, setNavSelected] = useState('dashboard');

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const renderStockCard = (stock, type) => (
    <div
      key={stock.symbol}
      className={`stock-card ${type === 'gainer' ? 'gainer' : 'loser'}`}
      role="region"
      aria-label={type === 'gainer' ? 'Top Gainer Stock' : 'Top Loser Stock'}
    >
      <div className="stock-symbol">{stock.symbol}</div>
      <div className="stock-name">{stock.name}</div>
      <div className="stock-price">${stock.price.toFixed(2)}</div>
      <div
        className={`stock-change ${stock.change > 0 ? 'pos' : 'neg'}`}
        title={(stock.change > 0 ? '+' : '') + stock.change + ' (' + (stock.changePct > 0 ? '+' : '') + stock.changePct + '%)'}
      >
        {stock.change > 0 ? '▲' : '▼'} {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePct > 0 ? '+' : ''}{stock.changePct.toFixed(2)}%)
      </div>
    </div>
  );

  // PUBLIC_INTERFACE
  const calcPortfolioValue = () =>
    DUMMY_PORTFOLIO.reduce((sum, holding) => sum + holding.currPrice * holding.shares, 0);

  // PUBLIC_INTERFACE
  const calcPortfolioPL = holding =>
    (holding.currPrice - holding.avgCost) * holding.shares;

  // PUBLIC_INTERFACE
  const renderPortfolioRow = holding => (
    <tr key={holding.symbol}>
      <td>{holding.symbol}</td>
      <td>{holding.shares}</td>
      <td>${holding.avgCost.toFixed(2)}</td>
      <td>${holding.currPrice.toFixed(2)}</td>
      <td className={calcPortfolioPL(holding) >= 0 ? 'pos' : 'neg'}>
        {calcPortfolioPL(holding) >= 0 ? '+' : ''}${calcPortfolioPL(holding).toFixed(2)}
      </td>
    </tr>
  );

  return (
    <div className="dashboard-app">
      <header className="dashboard-header" role="banner">
        <div className="header-content">
          <div className="logo-area">
            <div className="logo-icon" aria-label="Logo" />
            <span className="logo-text">StockDash</span>
          </div>
          <nav className="navbar" role="navigation" aria-label="Main navigation">
            <ul>
              <li>
                <button className={navSelected === 'dashboard' ? 'active' : ''} onClick={() => setNavSelected('dashboard')}>
                  Dashboard
                </button>
              </li>
              <li>
                <button className={navSelected === 'portfolio' ? 'active' : ''} onClick={() => setNavSelected('portfolio')}>
                  Portfolio
                </button>
              </li>
            </ul>
          </nav>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className="dashboard-main" role="main">
        <section className="section section-gainers" aria-labelledby="section-gainers-title">
          <h2 id="section-gainers-title" className="section-title">Top Gainers</h2>
          <div className="stock-grid">
            {DUMMY_GAINERS.map(stock => renderStockCard(stock, 'gainer'))}
          </div>
        </section>
        <section className="section section-losers" aria-labelledby="section-losers-title">
          <h2 id="section-losers-title" className="section-title">Top Losers</h2>
          <div className="stock-grid">
            {DUMMY_LOSERS.map(stock => renderStockCard(stock, 'loser'))}
          </div>
        </section>
        <section className="section section-portfolio" aria-labelledby="section-portfolio-title">
          <h2 id="section-portfolio-title" className="section-title">Your Portfolio</h2>
          <div className="portfolio-table-wrap">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Shares</th>
                  <th>Cost/Share</th>
                  <th>Current</th>
                  <th>P/L</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_PORTFOLIO.map(renderPortfolioRow)}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td style={{ fontWeight: 'bold' }}>Value:</td>
                  <td style={{ fontWeight: 'bold' }}>
                    ${calcPortfolioValue().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
      <footer className="dashboard-footer" role="contentinfo">
        <span>© 2024 StockDash &middot; Demo Dashboard</span>
      </footer>
    </div>
  );
}

export default App;
