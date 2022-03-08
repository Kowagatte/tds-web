import React, {useEffect, useState,} from "react";
import {getSocket} from '../../socket';

function GamePage() {
    const [socket, setSocket] = useState(null)

    useEffect(() =>{
      var parentSocket = getSocket();
      if(parentSocket){
        setSocket(parentSocket)
      }

      var c = document.getElementById("gameFrame");
      var ctx = c.getContext("2d");

      // Create gradient
      var grd = ctx.createLinearGradient(0, 0, 800, 0);
      grd.addColorStop(0, "blue");
      grd.addColorStop(1, "white");

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.fillRect(10, 10, 800, 600);

    }, []);

    return(
      <div>
        <canvas id="gameFrame" width="800" height="600"></canvas>
      </div>
    );
}

export default GamePage;
