import { useReducer } from "react";
import TournamentContext from './TournamentContext';

const initialTournamentState = {
  teams: 'teams',
  scores: [],
  gamesList: [''] 
}

function tournamentReducer(tournamentState, action) {
  switch (action.type) {
    case 'setTeams': {
      return {
        ...tournamentState,
        teams: action.newTeams
      }
    }
    case 'setScores': {
      return {
        ...tournamentState,
        scores: action.newScores
      }
    }
    case 'teamWon': {
      return {
        teams: tournamentState.teams,
        scores: action.newscores,
        gamesList: action.gameslist
      }
    }
    case 'setGames': {
      return {
        ...tournamentState,
        gamesList: action.newGames
      }
    }
  }
}

function TournamentContextProvider({children}) {
  const [tournamentState, tournamentDispatch] = useReducer(tournamentReducer, initialTournamentState)


  const setTeams = (newTeams) => {
    tournamentDispatch({
      type: 'setTeams',
      newTeams: newTeams
    })
  }

  const setScores = (newScores) => {
    tournamentDispatch({
      type: 'setScores',
      newScores: newScores
    })
  }

  function updateScore(newGamesList, newScores) {
    tournamentDispatch({
      type: 'teamWon',
      gameslist: newGamesList,
      newscores: newScores
    })
  } 

  const setGamesList = (newGamesArr2) => {
    tournamentDispatch({
      type: 'setGames',
      newGames: newGamesArr2
    })
  }

  return (
    <TournamentContext.Provider value={[tournamentState, setGamesList, setTeams, setScores, updateScore]}>
      {children}
    </TournamentContext.Provider>
  )
}

export default TournamentContextProvider;
