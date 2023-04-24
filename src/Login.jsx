import { useState } from 'react';
import { ACTIONS, SERVER } from './constants';
import Status from './Status';
import './Login.css';
import { fetchLogin } from './services';
const { Fragment } = require("react");





function Login({state, dispatch}){

    // const [state, dispatch] = useReducer(reducer, initialState);

    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState(false)

   // triggers on change in input field
    function getUsername(e){
        setUsername(e.target.value)
    }


    // triggers once login btn is entered
    function loginUser(){
     fetchLogin(username)
     .then((data)=>{
        let username = data.username;
        // update the username
        dispatch({type: ACTIONS.GET_USERNAME, username });
        // on login show the GAme page: changing state to is login
        dispatch({ type: ACTIONS.LOG_IN, username}); 

    })
     .catch((err)=>{
        let error = err?.error
        setLoginError(true)
        if( err?.error === SERVER.AUTH_MISSING || err?.error === SERVER.AUTH_INSUFFICIENT || err?.error === SERVER.REQUIRED_USERNAME ) { 
            dispatch({type: ACTIONS.REPORT_ERROR, error})
            return;
          }
        // defualt error message
        dispatch({type: ACTIONS.REPORT_ERROR, error}) 
    })
    }

    return(
        <Fragment>           
            <div className="login_section">
                <div>
                <label
                aria-label='username'
                >
                    Username : 
                    <input 
                     aria-placeholder="Enter username to login"
                     value={username}
                     onChange={(e)=>{getUsername(e)}}
                     type="text" />
                </label>
                <label>  
                    <button
                    aria-label='Login'
                    onClick = {(e)=>{loginUser(e)}} 
                    >Login</button> 
                </label>
                </div>
                {state.error && loginError  && <Status error={state.error}/> }
            </div>       
        </Fragment>
        
    )
}

export default Login;