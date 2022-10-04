import { useContext } from "react"

import PlayerContext from '../contexts/PlayerContext';

export default function Players() {

  const [playersState, addPlayer, removePlayer, handleChange] = useContext(PlayerContext)
  const {players, inputs, playerCount} = playersState;

  const change = (e, i) => {
    const value = e.target.value;
    console.log(value)
    const index = i
    handleChange(value, index)
  }

  const inputRender = inputs.map((input, i) => (
    <div key={i}>
      <input onChange={(e) => change(e, `${i}`)} value={players[i]} type="text"  placeholder={`Player ${input + 1}`} />
      <button onClick={() => removePlayer(i)}>Remove</button>
    </div>  
  ))

  console.log(playersState.players);

  return (
    <div>
      <div className="players">
        <h3>Players:</h3>
        {playerCount}
        {inputRender}
      </div>
      <button onClick={addPlayer}>Add Player</button>
    </div>
  )
}
