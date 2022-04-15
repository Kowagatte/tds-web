import React, {useState,} from "react";

function Scoreboard(){

  const [playerOneScore, setPlayerOneScore] = useState(0)
  const [playerTwoScore, setPlayerTwoScore] = useState(0)
  const [roundNumber, setRoundNumber] = useState(1)
  const [roundTimer, setRoundTimer] = useState(240)

  return(
    <div className={'scoreboard'}>
      <div className={'sb-score'}>{playerOneScore}</div>
      <div className={'sb-score'}>{playerTwoScore}</div>
      <div className={'sb-round'}>{roundNumber}</div>
      <div className={'sb-timer'}>{roundTimer}</div>
    </div>
  )

}

export default Scoreboard;
