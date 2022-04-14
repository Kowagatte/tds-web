function ProfileBadge(props) {

  const {username, mmr, profile_picture} = props;

  if(username !== undefined){

    return(
      <div className={'profilebadgecontainer'}>
        <img className={'profilepicture'} src={profile_picture}></img>
        Logged in as: {username} <br/>
        Current MMR: {mmr}
      </div>
    )

  }else{
    return(
      <div className={'profilebadgecontainer'}>
        ProfileBadge
        <br/>
        Not logged in.
      </div>
    )
  }
}

export default ProfileBadge;
