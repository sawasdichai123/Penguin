import { TamagotchiDevice } from './components/TamagotchiDevice';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <h1 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>My Penguin Pet</h1>
      <TamagotchiDevice />
      <div className="ice-floor"></div>
    </div>
  );
}

export default App;
