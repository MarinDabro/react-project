import { useContext, useEffect, useState } from "react"
import TournamentContext from '../contexts/TournamentContext';
import GameContext from '../contexts/GameContext';
import PlayerContext from '../contexts/PlayerContext';

import TeamDisplay from './TeamDisplay';
import ActiveGame from './activeGame';

export default function Tournament() {


  const [tournamentState, setGamesList, setTeams, setScores] = useContext(TournamentContext);
  const {teams, gamesList} = tournamentState; 

  const [gameState] = useContext(GameContext);
  const {teamSize} = gameState;

  const [playersState] = useContext(PlayerContext);
  const {playerCount, players} = playersState;

  const [teamView, setTeamView] = useState(true);

  const toggleTeams = () => {
    setTeamView(teamView => !teamView);
  }

  useEffect(() => {
    const teamCount = Math.ceil(playerCount / teamSize) 
    console.log(teamCount)
    let newTeams = {};
    const players2 = players;
    players2.sort(() => Math.random() - 0.5);
    
    for (let i = 1; i <= teamCount; i++) {
      
      newTeams[`Team${i}`] = [];
      
      for (let j = 1; j <= teamSize; j++) {
        const randomPlayer = Math.floor(Math.random() * players2.length)
        if (players2.length > 0) {
          const team = `Team${i}`;
          newTeams[team].push(players2[randomPlayer]);
          players2.splice(randomPlayer, 1);
        }
      }
    }

    setTeams(newTeams);
  }, [])

  useEffect(() => {
    let scores2 = {};

    for (let i = 1; i <= Math.ceil(playerCount / teamSize); i++) {
      scores2[`Team${i}`] = 0
    }

    setScores(scores2);
  }, [])

  useEffect(() => {

    let teamsArr = [];
    let gamesArr = [];
    const teamN = Math.ceil(playerCount / teamSize);

    for (let i = 1; i <= teamN; i++) {
      teamsArr.push(`Team ${i}`);      
    }

    for (let i = 0; i < teamsArr.length; i++) {
        for (let j = 0; j < teamsArr.length; j++) {
            gamesArr.push([teamsArr[i], teamsArr[j]]);
        }
    }

    let newGamesArr = [];
    
    gamesArr.map((game, index) => {
      if (game[1] !== game[0]) {
        newGamesArr.push(gamesArr[index])
      }
    })

    newGamesArr.map((game, index) => {
      newGamesArr.map((game2, index2) => {
        if ( game[1] === game2[0] && game[0] === game2[1] ) {
          newGamesArr.splice(index2, 1)
        }
      })
    })

    let newGamesArr2 = []

    for (let i = 0; i < newGamesArr.length; i++) {
      if (newGamesArr2.length === 0) {
        newGamesArr2.push(newGamesArr[0]);
        newGamesArr.splice(0, 1)
      } else {
        for (let j = 0; j < 10; j++) {
          newGamesArr.map((game, index) => {
            const short = newGamesArr2[newGamesArr2.length - 1]
            if (!game.includes(short[0]) && !game.includes(short[1])) {
              newGamesArr2.push(game);
              newGamesArr.splice(index, 1)
            }
          })
        }
      }
    }


    newGamesArr.map((game, index) => {
      newGamesArr2.push(game);
    })
    console.log(newGamesArr2);
    setGamesList(newGamesArr2);
  }, [])
  
    
  return (
    <div>
      <h2>Tournament</h2>
      <button onClick={toggleTeams}>Toggle Teams</button>
      {teamView ? <TeamDisplay /> : <div></div>}
      <ActiveGame />
    </div>
  )
}
