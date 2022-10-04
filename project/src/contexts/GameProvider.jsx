import { useReducer } from 'react';
import GameContext from './GameContext';

const initialGameState = {
  teamSize: 1,
  pointRewards: [1, 0, 0],
  timer: false,
  timerDuration: 5

}

const gameReducer = function(gameState, action) {
  
  switch (action.type) {
    case 'changeTeamSize': {
      if (action.name === 'increase') {
        return {
          ...gameState,
          teamSize: gameState.teamSize + 1
        }
      } else if (action.name === 'decrease' && gameState.teamSize > 1) {
        return {
          ...gameState,
          teamSize: gameState.teamSize - 1
        }
      } else {
        alert('Cant decrease further');
        return {
          ...gameState
        }
      }
    }
    case 'toggleTimer': {
      return {
        ...gameState,
        timer: !gameState.timer
      }
    }
    case 'changeTimerDuration': {
      if (action.name === 'increase') {
        return {
          ...gameState,
          timerDuration: gameState.timerDuration + 1
        }
      } else if (action.name === 'decrease' && gameState.timerDuration > 1) {
        return {
          ...gameState,
          timerDuration: gameState.timerDuration - 1
        }
      } else {
        alert('Cant decrease further');
        return {
          ...gameState
        }
      }
    }
    case 'changePointRewards': {
      return {
        ...gameState,
        pointRewards: [action.value]
      }
    }
  }
}

function GameContextProvider({children}) {
    const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

    const handleTeamSize = (name) => {
      gameDispatch({
        type: 'changeTeamSize',
        name: name
      })
    }

    const toggleTimer = () => {
      gameDispatch({
        type: 'toggleTimer'
      })      
    }

    const handleTimerDuration = (name) => {
      gameDispatch({
        type: 'changeTimerDuration',
        name: name
      })
    }

    const handlePointRewards = (value) => {
      gameDispatch({
        type: 'changePointRewards',
        value: value
      })
    }

    return (
        <GameContext.Provider value={[gameState, handleTeamSize, toggleTimer, handleTimerDuration, handlePointRewards]}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;
