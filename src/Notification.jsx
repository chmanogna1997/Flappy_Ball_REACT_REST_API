import { Fragment } from "react";
import './Notification.css';
import { fetchDeclineUser, fetchAcceptingUser } from './services';
import { ACTIONS } from "./constants";


function Notification({ notificationList, currentUser, dispatch, state }) {

    // triggers when user declines the request
    function onDecline(declingUser) {
        // let declingUser = e.target.dataset.id;
        fetchDeclineUser(declingUser, currentUser)
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
            })
    }

    // triggers when user accepts the request
    function onAccept(e) {
        let acceptingUser = e.target.dataset.id;
        fetchAcceptingUser(acceptingUser, currentUser)
            .then((data) => {
                // starting the game 
                dispatch({ type: ACTIONS.START_GAME });
                dispatch({ type: ACTIONS.TWO_PLAYER, oppUser: e.target.dataset.id });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
            })
    }

    let showNotifications = (notificationList && notificationList.length) > 0 ?
        (notificationList.map(e => <li key={e} data-id={e} className="notify_section">
            <div><p>Game request from {e}</p></div>
            <button
                data-id={e}
                onClick={(e) => { onAccept(e) }}
            >Accept</button>
            <button
                onClick={(e) => { onDecline(e.target.dataset.id) }}
                data-id={e}>Decline</button>
        </li>)) : '';

    
function  autoDeclineUser(){
    if(notificationList){
        notificationList.map(e =>{ onDecline(e) })
    }
}
    return (
        <Fragment>
            <ul>
                {state.gameStart && autoDeclineUser()}
                {!state.gameStart && showNotifications}
            </ul>
        </Fragment>
    )
}

export default Notification;