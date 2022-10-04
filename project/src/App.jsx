import Home from './home';
import PlayerContextProvider from './contexts/PlayerProvider';
import GameContextProvider from './contexts/GameProvider';
import StartContextProvider from './contexts/StartProvider';
import TournamentContextProvider from './contexts/TournamentProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <StartContextProvider>
        <PlayerContextProvider>
          <GameContextProvider>
            <TournamentContextProvider>
              <Home /> 
            </TournamentContextProvider>
          </GameContextProvider>
        </PlayerContextProvider>
      </StartContextProvider>
    </div>
  );
}

export default App;
