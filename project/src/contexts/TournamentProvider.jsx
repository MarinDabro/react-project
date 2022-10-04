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
        ...tournamentState,
        scores: action.newscores,
        gamesList: action.gameslist
      }
    }
    case 'draw': {
      return {
        ...tournamentState,
        scores: action.newscores2,
        gamesList: action.gameslist2
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

  function updateDraw(newGamesList2, newScores2) {
    tournamentDispatch({
      type: 'draw',
      gameslist2: newGamesList2,
      newscores2: newScores2
    })
  }

  const setGamesList = (newGamesArr2) => {
    tournamentDispatch({
      type: 'setGames',
      newGames: newGamesArr2
    })
  }

  return (
    <TournamentContext.Provider value={[tournamentState, setGamesList, setTeams, setScores, updateScore, updateDraw]}>
      {children}
    </TournamentContext.Provider>
  )
}

export default TournamentContextProvider;
