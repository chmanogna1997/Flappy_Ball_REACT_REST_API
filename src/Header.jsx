import { Fragment } from "react";
import './Header.css';
import { LOGIN_STATUS } from "./constants";
import { fetchLogout } from "./services";
import { ACTIONS } from "./constants";


function Header({state, dispatch}){
    function onLogout(){

        clearInterval(state.interval)
        dispatch({type:ACTIONS.LOG_OUT})

        fetchLogout()
        .catch((err)=>{
            dispatch({type: ACTIONS.REPORT_ERROR, error:err?.error}) 
        })
    }
    return(
        <Fragment>
            < div className="header_section">
            <h1> Flappy Ball </h1>
            {state.loginStatus === LOGIN_STATUS.IS_LOGEDIN && <button onClick={(e)=>{onLogout()}}> Logout </button>}
            </div>
        </Fragment>
    )
} 

export default Header;