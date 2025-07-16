import React, { useState, useEffect } from "react";
import "./App.css";

// Dummy data for top gainers, top losers, and the portfolio
const DUMMY_GAINERS = [
  { symbol: "AAPL", name: "Apple Inc.", change: "+3.21%", price: "$187.34" },
  { symbol: "NVDA", name: "NVIDIA Corp.", change: "+2.90%", price: "$845.22" },
  { symbol: "AMZN", name: "Amazon.com Inc.", change: "+2.15%", price: "$135.99" },
  { symbol: "MSFT", name: "Microsoft Corp.", change: "+1.70%", price: "$316.65" },
  { symbol: "TSLA", name: "Tesla Inc.", change: "+1.51%", price: "$782.11" },
];

const DUMMY_LOSERS = [
  { symbol: "ZM", name: "Zoom Video", change: "-4.11%", price: "$77.12" },
  { symbol: "SNAP", name: "Snap Inc.", change: "-3.47%", price: "$10.39" },
  { symbol: "PYPL", name: "PayPal Holdings", change: "-2.80%", price: "$65.70" },
  { symbol: "NFLX", name: "Netflix Inc.", change: "-2.65%", price: "$384.29" },
  { symbol: "BABA", name: "Alibaba Group", change: "-1.89%", price: "$73.11" },
];

const DUMMY_PORTFOLIO = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 15, avgCost: "$145.00", current: "$187.34", pl: "+$635.10" },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 7, avgCost: "$650.00", current: "$782.11", pl: "+$926.77" },
  { symbol: "GOOG", name: "Alphabet Inc.", shares: 6, avgCost: "$2,430.00", current: "$2,549.68", pl: "+$718.08" },
];

// PUBLIC_INTERFACE
function App() {
  // Theme handling (default is light)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header className="dashboard-header">
        <div className="dashboard-container">
          <div className="logo-title-row">
            <div className="dashboard-logo" aria-label="Logo" />
            <h1 className="dashboard-title">Stock Market Dashboard</h1>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <nav className="dashboard-nav">
            <a href="#gainers" className="dashboard-nav-link">Top Gainers</a>
            <a href="#losers" className="dashboard-nav-link">Top Losers</a>
            <a href="#portfolio" className="dashboard-nav-link">Portfolio</a>
          </nav>
        </div>
      </header>

      <main className="dashboard-main dashboard-container">
        <section id="gainers" className="dashboard-section">
          <h2 className="section-title accent">Top Gainers</h2>
          <div className="section-grid">
            {DUMMY_GAINERS.map((stock) => (
              <StockCard key={stock.symbol} {...stock} direction="up" accentStyle="accent" />
            ))}
          </div>
        </section>

        <section id="losers" className="dashboard-section">
          <h2 className="section-title secondary">Top Losers</h2>
          <div className="section-grid">
            {DUMMY_LOSERS.map((stock) => (
              <StockCard key={stock.symbol} {...stock} direction="down" accentStyle="secondary" />
            ))}
          </div>
        </section>

        <section id="portfolio" className="dashboard-section">
          <h2 className="section-title primary">Your Portfolio</h2>
          <div className="portfolio-table-wrapper">
            <PortfolioTable data={DUMMY_PORTFOLIO} />
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <span>© {new Date().getFullYear()} Stock Market Dashboard | Built with React</span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function StockCard({ symbol, name, change, price, direction, accentStyle }) {
  // accentStyle: "accent" for gainers, "secondary" for losers
  return (
    <div className={`stock-card ${accentStyle}`}>
      <div className="stock-symbol">{symbol}</div>
      <div className="stock-name">{name}</div>
      <div className={`stock-change ${direction}`}>
        {direction === "up" ? "▲" : "▼"} <span>{change}</span>
      </div>
      <div className="stock-price">{price}</div>
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
          <th>Company</th>
          <th>Shares</th>
          <th>Avg. Cost</th>
          <th>Current</th>
          <th>P/L</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.shares}</td>
            <td>{stock.avgCost}</td>
            <td>{stock.current}</td>
            <td className={`portfolio-pl ${stock.pl.startsWith("+") ? "profit" : "loss"}`}>{stock.pl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
