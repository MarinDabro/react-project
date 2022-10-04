import { useContext } from "react"
import GameContext from '../contexts/GameContext';

export default function GameSettings() {
  const [gameState, handleTeamSize, toggleTimer, handleTimerDuration, handlePointRewards] = useContext(GameContext);
  const { teamSize, timer, timerDuration, pointRewards } = gameState;

  const changeTeamSize = (e) => {
    const name = e.target.name;
    handleTeamSize(name)
  }

  const changeTimerDuration = (e) => {
    const name = e.target.name;
    handleTimerDuration(name)
  }

  const TimerSetting = () => {
    if (timer) {
      return (
        <div>
          <h4>{timerDuration} Minutes</h4>
          <button name='increase' onClick={changeTimerDuration}>+</button>
          <button name='decrease' onClick={changeTimerDuration}>-</button>
        </div>
      )
    }
  }

  const changePointRewards = (e) => {
    handlePointRewards(e.target.value.split(',')) 
  }

  console.log(pointRewards)

  return (
    <div>

      <div>
        <h3>Teamsize:</h3>
        <h4>{teamSize}</h4>
        <button name='increase' onClick={changeTeamSize}>+</button>
        <button name='decrease' onClick={changeTeamSize}>-</button>
      </div>

      <div>
        <h3>Points:</h3>
        <select onChange={changePointRewards} name="modes" id="mode-select">
          <option value={[1, 0, 0]}>W: 1  -  D: 0  -  L: 0</option>
          <option value={[3, 1, 0]}>W: 3  -  D: 1  -  L: 0</option>
        </select> 
      </div>

      <div>
        <h3>Timer:</h3>
        <button onClick={toggleTimer}><h4>{timer ? 'Timer: ON' : 'Timer: OFF'}</h4></button>
        <TimerSetting /> 
      </div>

    </div>
  )
}
