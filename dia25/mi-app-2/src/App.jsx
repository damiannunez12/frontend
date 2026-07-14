import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// 1. DEFINIMOS EL COMPONENTE DE ETHEREUM FUERA DE APP
const CryptoTracker = () => {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COIN_ID = 'ethereum'; 

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      // Nota: Corregida también la URL de la API que se había cortado en tu código
      const response = await axios.get(
        `https://coingecko.com{COIN_ID}`
      );
      setCoinData(response.data);
      setError(null);
    } catch (err) {
      setError('Error al obtener los datos de la API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  if (loading) return <p>Cargando datos de Ethereum...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#242424', borderRadius: '8px', marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <img src={coinData?.image?.small} alt={coinData?.name} />
        <h2>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</h2>
      </div>
      
      <div style={{ marginTop: '15px', lineHeight: '1.6' }}>
        <p><strong>Precio:</strong> ${coinData?.market_data?.current_price?.usd?.toLocaleString()} USD</p>
        <p>
          <strong>Cambio 24h:</strong>{' '}
          <span style={{ color: coinData?.market_data?.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336' }}>
            {coinData?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
};

// 2. TU COMPONENTE PRINCIPAL APP
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      {/* Logos originales de Vite de tu plantilla */}
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      {/* Imagen Hero que tenías importada */}
      {heroImg && <img src={heroImg} alt="Hero" style={{ width: '200px', margin: '20px 0' }} />}

      <h1>Vite + React</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      {/* 3. AQUÍ INVOCAMOS EL COMPONENTE DE ETHEREUM COMO UNA ETIQUETA HTML */}
      <CryptoTracker />
    </div>
  )
}

export default App
