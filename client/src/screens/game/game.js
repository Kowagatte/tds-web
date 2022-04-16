import React, {useEffect, useState,} from "react";
import {getSocket} from '../../socket';
import PlayerBadge from "./playerbadge"
import Scoreboard from "./scoreboard"
import "./game.css"

function GamePage() {
    const [socket, setSocket] = useState(null)


    var playerOne = new player(140, 10, "red", 10, 120);

    function startGame(){
      game.start();
    }

    // TODO ACCEPT UPDATES FROM SERVER AND THEN DRAW THEM TO THE SCREEN.
    // ALLOW THE PLAYER TO CONTROL A GIVEN SPRITE

    var game = {
      canvas : document.createElement("canvas"),
      start : function(){
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.getElementById('gameFrame').appendChild(this.canvas);
        this.interval = setInterval(update, 20);
      },
      clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.globalCompositeOperation = 'destination-under';
        // Now draw!
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    function player(width, height, color, x, y){
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.update = function(){
        var ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }

    function update(){
      game.clear();
      playerOne.x += 1;
      playerOne.update();
    }

    useEffect(()=>{
      startGame();
    });

    return(
      <center id={'gameFrame'}>
        <PlayerBadge/>
        <PlayerBadge/>
        <Scoreboard/>

      </center>
    );
}

export default GamePage;
