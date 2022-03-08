import {Link} from 'react-router-dom';
import './signin.css'

function SignIn() {
  return(
    <Link id={'signin-button'} to={{pathname:"/login"}}>
      Sign In
    </Link>
  );
}

export default SignIn;
