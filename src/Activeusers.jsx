import { Fragment } from "react";
import { fetchSendReq } from "./services";
import { ACTIONS } from "./constants";

function Activeusers({activeUsers, setWaitFlag, waitFlag, state, dispatch}){

    function onSendRequest(e) {
        fetchSendReq(state.username, e.target.dataset.id)
          .then((data) => { setWaitFlag(true) })
          .catch((err) => { 
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
           })
      }

    let userList = activeUsers ?
    (activeUsers.map((user) => <li className="user" key={user} data-id={user}> <div> {user}</div>
     <button
       disabled = {waitFlag}
       data-id={user} onClick={(e) => onSendRequest(e)} className="req_btn"> Challenge </button>
     </li>)) : '';
  userList = userList.length > 0 ? userList : <li className="nouser_msg"> <h4> No users available</h4></li>


    return(
        <Fragment>
            <ul>
                <li> <h2> Active Users </h2></li>
                {userList}
              </ul>
        </Fragment>
    )
}

export default Activeusers;