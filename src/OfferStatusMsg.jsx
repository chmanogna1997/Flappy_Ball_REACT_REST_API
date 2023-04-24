import { Fragment } from "react";
import './OfferStatusMsg.css';
import { ACTIONS } from "./constants";
import { updateNotificationList } from "./services";

function OfferStatusMsg({offerStatus, state, dispatch, setWaitFlag, setOfferStatus}){

    function OfferDeclineOrAccept(e){
        updateNotificationList(offerStatus, state.username)
        .then((data)=>{

          if(offerStatus === 'accepted'){
            dispatch({ type: ACTIONS.START_GAME});
          }
            setWaitFlag(false)
            setOfferStatus('')
        })
        .catch((err)=>{
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
        })
    }

    let declinesection = 
    <div className="msg_section" >
    <p> Hello {state.username} your challenge is DECLINED!! </p>
    <button onClick={(e)=>{OfferDeclineOrAccept(e)}}>OK</button>
    </div>

    let acceptSection = 
    <div className="msg_section" >
    <p> Hello {state.username} your challenge is ACCEPTED!! Click OK to Start the Game </p>
    <button onClick={(e)=>{OfferDeclineOrAccept(e)}}>OK</button>
    </div>

  return(
    <Fragment>
    {offerStatus === 'declined' && declinesection}
    {offerStatus === 'accepted' && acceptSection }
    </Fragment>
  )
}

export default OfferStatusMsg;