import {useState, useContext, useEffect, useLayoutEffect} from 'react';
import TournamentContext from '../contexts/TournamentContext';

  export default function TeamDisplay() {

    const [tournamentState] = useContext(TournamentContext);
    const {teams} = tournamentState;


    const [renderPlease, setRenderPlease] = useState(0);
    
    useEffect(() => {
      setRenderPlease(1)
    }, [])

    let newArr = [];
    if (typeof teams === 'object') {
      for (let team in teams) {
        newArr.push(
          <div key={team}>
            <h4>{team}</h4>
            {
              teams[team].map(player => {
                return (
                  <p key={player}>{player}</p>
                )
              })
            }
          </div>
        )
      }
    }

    return (
      <div>
        {
          renderPlease === 1 ?
          <div>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {
                  newArr.map((team, index) => team)
                }
              </div>
          </div> : <div></div>
        }
      </div>
    )
  }

