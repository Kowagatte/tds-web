import React, {useEffect, useState,} from "react";

function PlayerBadge(){

  const [playerInfo, setPlayerInfo] = useState({username: "Not Found", mmr: 1000, profile_picture: "?"})

  useEffect(() =>{
    //Send regular GET request for opponent information.
  }, []);

  return(
    <div className={'player-badge'}>
      {playerInfo.username} <br/>
      MMR: {playerInfo.mmr}
    </div>
  )

}

export default PlayerBadge;
