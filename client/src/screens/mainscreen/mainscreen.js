import "./mainscreen.css"
import logo from "../../logo.png"
import LeaderBoard from "./leaderboard";
import LiveMatch from "./livematch";
import ProfileBadge from "./profilebadge";
import SignIn from "./signin";
import MatchHistory from "./matchhistory"
import GameButton from "./gamebutton"

import {Link} from 'react-router-dom';

function MainScreen() {

  return(
    <div className={'mainscreenpage'}>
      <div className={'header'}>
        <img className={'logo'} src={logo} href={''}/>
        <div className={'title'}>TDShooter</div>
        <SignIn/>
      </div>
      <div id={'column1'}>
        <LeaderBoard/>
        <LiveMatch/>
      </div>
      <div id={'column2'}>
        <GameButton/>
      </div>
      <div id={'column3'}>
        <ProfileBadge/>
        <MatchHistory/>
      </div>
    </div>
  );

}

export default MainScreen;
