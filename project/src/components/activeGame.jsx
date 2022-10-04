import { useContext, useEffect, useState } from "react";
import GameContext from '../contexts/GameContext';
import TournamentContext from "../contexts/TournamentContext";
import PlayerContext from '../contexts/PlayerContext'


export default function ActiveGame() {

  const [gameState] = useContext(GameContext);
  const {pointRewards} = gameState;
  const [tournamentState, updateScore] = useContext(TournamentContext);
  const {gamesList, scores} = tournamentState;


  const [renderPlease, setRenderPlease] = useState(0);

  useEffect(() => {
    setRenderPlease(1)
  }, [])

  console.log(scores);

   const team1 = gamesList[0];
   const team2 = gamesList[1];
   const team3 = gamesList[2];

  const teamWon = (e) => {
    const winner = e.target.value.replace(/\s+/g, '');
    const points = pointRewards[0];
    console.log('hi')
    console.log(pointRewards)
    const newScore = scores[winner] + parseInt(points);
    const newScores = scores;
    newScores[winner] = newScore;
    let newGamesList = tournamentState.gamesList;
    let newGamesList2 = newGamesList.splice(1);
    updateScore(newGamesList2, newScores);
  }

  // const draw = (e) => {
  //   const winner1 = e.target.value.split(',')[0].replace(/\s+/g, '');
  //   const winner2 = e.target.value.split(',')[1].replace(/\s+/g, '');
  //   const points = pointRewards[0];
  //   const newScore = scores[winner1] + parseInt(points[1]);
  //   const newScore2 = scores[winner2] + parseInt(points[1]);
  //   const newScores = scores;
  //   newScores[winner1] = newScore;
  //   newScores[winner2] = newScore2;
  //   let newGamesList3 = tournamentState.gamesList;
  //   let newGamesList4 = newGamesList3.splice(1);
  //   updateDraw(newGamesList4, newScores);
  // }

  function Team1() {
    return (
      <div style={{display: "flex", justifyContent: "space-around"}}>
        <div>
          <h4 key={team1[0]}>{team1[0]}</h4>
          <button onClick={teamWon} value={team1[0]}>Winner</button>
        </div>
        <div>
          <h5>VS</h5>
        </div>
        <div>
          <h4 key={team1[1]}>{team1[1]}</h4>
          <button onClick={teamWon} value={team1[1]}>Winner</button>
        </div>
      </div>
    )
  }

  function Team2() {
    return (
      <div>
        <h5>{team2[0]}</h5>
        <h6>VS</h6>
        <h5>{team2[1]}</h5>
      </div>
    )
  }

  function Team3() {
    return(
      <div>
        <h5>{team3[0]}</h5>
        <h6>VS</h6>
        <h5>{team3[1]}</h5>
      </div>
    )
  }

  function ScoreBoard() {
    let sortable = [];
    for (let team in scores) {
        sortable.push([team, scores[team]]);
    }

    sortable.sort((a, b) => a[1] - b[1]);
    let objSorted = {}
    sortable.forEach(item => objSorted[item[0]] = item[1])

    let newArr = [];
    for(let team in objSorted){
      newArr.push(
        <div key={team}>
          <h3>{team}: {objSorted[team]} Points</h3>
        </div>
      )
    }

    return (
      <div>
        {
          newArr.reverse().map((team, index) => team)
        }
      </div>
    )
  }



  return (
    <div> 
      {
        renderPlease === 1 ? 
        <div>
          {gamesList.length === 0 ? <ScoreBoard /> : <div></div>}
          <div>
            {
              team1 ? <Team1 /> : <div></div>
            }
          </div>
          <div>
            {
              team2 ? <Team2 /> : <div></div>
            }
          </div>
          <div>
            {
              team3 ? <Team3 /> : <div></div>
            }
          </div> 
        </div>: <div>Just a Moment</div>
      }
    </div>
  ) 
}
