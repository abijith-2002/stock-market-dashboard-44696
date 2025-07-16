import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';

// Dummy Data
const gainers = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: 128.56, change: +2.45, percent: "+1.94%" },
  { symbol: "AAPL", name: "Apple Inc.", price: 198.33, change: +1.12, percent: "+0.57%" },
  { symbol: "MSFT", name: "Microsoft Corp", price: 415.75, change: +2.03, percent: "+0.49%" },
];
const losers = [
  { symbol: "TSLA", name: "Tesla Inc.", price: 187.1, change: -4.80, percent: "-2.50%" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.34, change: -1.79, percent: "-0.97%" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 621.54, change: -10.85, percent: "-1.72%" },
];
const portfolio = [
  { symbol: "AAPL", name: "Apple Inc.", quantity: 12, avgCost: 158.99, price: 198.33 },
  { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 5, avgCost: 1250.50, price: 1867.98 },
  { symbol: "MSFT", name: "Microsoft Corp", quantity: 7, avgCost: 340.12, price: 415.75 },
];

// Components

// PUBLIC_INTERFACE
const Header = () => (
  <header className="dashboard-header">
    <img src={logo} className="dashboard-logo" alt="logo" />
    <nav className="dashboard-nav">
      <span className="nav-item nav-brand">Stock Market Dashboard</span>
      <span className="nav-item">Home</span>
      <span className="nav-item">Portfolio</span>
      <span className="nav-item">Markets</span>
      <span className="nav-item">Logout</span>
    </nav>
  </header>
);

// PUBLIC_INTERFACE
function StockCard({ symbol, name, price, change, percent }) {
  // Determine style for gain/loss
  const isGain = change >= 0;
  return (
    <div className={`stock-card${isGain ? " gain" : " loss"}`}>
      <div className="stock-symbol">{symbol}</div>
      <div className="stock-name">{name}</div>
      <div className="stock-price">${price.toFixed(2)}</div>
      <div className={`stock-change${isGain ? " gain" : " loss"}`}>
        {isGain ? "+" : ""}
        {change.toFixed(2)} <span className="stock-percent">{percent}</span>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function PortfolioTable({ data }) {
  return (
    <table className="portfolio-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Avg Cost</th>
          <th>Market Price</th>
          <th>P/L</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          const profit = (stock.price - stock.avgCost) * stock.quantity;
          return (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>${stock.avgCost.toFixed(2)}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td className={profit >= 0 ? "profit" : "loss"}>
                {profit >= 0 ? "+" : ""}
                ${profit.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// PUBLIC_INTERFACE
function DashboardContent() {
  return (
    <main className="dashboard-main">
      <section className="dashboard-section gainers">
        <h2>Top Gainers</h2>
        <div className="stock-list">
          {gainers.map((stock) =>
            <StockCard key={stock.symbol} {...stock} />
          )}
        </div>
      </section>
      <section className="dashboard-section losers">
        <h2>Top Losers</h2>
        <div className="stock-list">
          {losers.map((stock) =>
            <StockCard key={stock.symbol} {...stock} />
          )}
        </div>
      </section>
      <section className="dashboard-section portfolio">
        <h2>My Portfolio</h2>
        <PortfolioTable data={portfolio} />
      </section>
    </main>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Color mode/theme, default to light as required
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <Header />
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <DashboardContent />
      <footer className="dashboard-footer">© {new Date().getFullYear()} Stock Market Dashboard &mdash; Demo for Kavia</footer>
    </div>
  );
}

export default App;
