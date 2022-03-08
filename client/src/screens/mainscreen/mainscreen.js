import "./mainscreen.css"
import logo from "../../logo.png"
import LeaderBoard from "./leaderboard";
import LiveMatch from "./livematch";
import ProfileBadge from "./profilebadge";
import SignIn from "./signin";
import MatchHistory from "./matchhistory"

function MainScreen() {

  return(
    <div className={'mainscreenpage'}>
      <div className={'title'}>
        <img className={'logo'} src={logo} href={''}/> TDShooter
      </div>
      <SignIn/>
      <LeaderBoard/>
      <LiveMatch/>
      <ProfileBadge/>
      <MatchHistory/>
    </div>
  );

}

export default MainScreen;
