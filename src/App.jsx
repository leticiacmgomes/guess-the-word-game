import './App.css';
import './css/reset.css'

import {GameCard} from './components/GameCard.jsx'

const  App = () => {
  return (
    <div className="App">
      <GameCard />
      <footer class="author-info">Coded by <a href="#">leticiacmgomes</a> | Challenge by <a href="https://www.devchallenges.io?ref=challenge" target="_blank">devChallenges.io</a>.
      </footer>
    </div>
  );
}

export default App;
