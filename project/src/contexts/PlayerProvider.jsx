import {useReducer} from 'react';
import PlayerContext from '../contexts/PlayerContext';

const initialPlayersState = {
  players: [],
  inputs: [],
  playerCount: 0
}

const playersReducer = function(playersState, action) {
  switch (action.type) {
    case 'addPlayer': {
      return {
        players: [...playersState.players, ''],
        inputs: [...playersState.inputs, playersState.inputs.length],
        playerCount: playersState.playerCount + 1
      }
    }
    case 'removePlayer': {
      return {
        players: playersState.players.filter((player, i) => i !== action.player),
        inputs: playersState.inputs.filter((input, i) => i !== action.player),
        playerCount: playersState.playerCount - 1
      }
    }
    case 'handleChange': {
      const index = Number(action.index);
      const newPlayers = [...playersState.players];
      newPlayers[index] = action.value;
      return {
        ...playersState,
        players: newPlayers
      }
    }
  }
}

function PlayerContextProvider({children}) {
    const [playersState, playersDispatch] = useReducer(playersReducer, initialPlayersState);

    const addPlayer = () => {
        playersDispatch({
          type: 'addPlayer',
        })
    }

    const removePlayer = (index) => {
      playersDispatch({
        type: 'removePlayer',
        player: index
      })
    }

    const handleChange = (value, index) => {
      playersDispatch({
        type: 'handleChange',
        index: index,
        value: value
      })
    }

    return (
        <PlayerContext.Provider value={[playersState, addPlayer, removePlayer, handleChange]}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;
