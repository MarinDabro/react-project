import { Routes, Route, NavLink, Outlet } from 'react-router-dom';

import StartContext from '../contexts/StartContext';
import GameContext from '../contexts/GameContext';
import PlayerContext from '../contexts/PlayerContext';
import TournamentContext from '../contexts/TournamentContext';

import Players from '../routes/players';
import GameSettings from '../routes/gamesettings';
import { useContext, useEffect } from 'react';

export default function Settings() {

  const [settingsDone, setSettingsDone] = useContext(StartContext);

  const [gameState] = useContext(GameContext);
  const {teamSize} = gameState;

  const [playersState] = useContext(PlayerContext);
  const {playerCount, players} = playersState;

  const [tournamentState, setTeams, setGamesList] = useContext(TournamentContext);
  const {teams, gamesList} = tournamentState;

  const startGame = () => {
    setSettingsDone(settingsDone => !settingsDone);
  }

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <nav>
          <NavLink to='players'><h2>Players</h2></NavLink>
          <NavLink to='gamesettings'><h2>Game</h2></NavLink>
        </nav>
        <Routes>
            <Route path='players' element={<Players />} />
            <Route path='gamesettings' element={<GameSettings />} />
        </Routes>    
        <Outlet />
      </div>
      <div>
        <button onClick={startGame}>Start Tournament</button>
      </div>  
    </div>  
  )
}
