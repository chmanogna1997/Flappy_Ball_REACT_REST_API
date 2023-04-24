import { Fragment, useState, useEffect } from "react";
import './TicTacToeHome.css';
import { fetchActiveUsers, fetchNotifications, getmaxScore } from './services';
import { ACTIONS, SERVER, CLIENT } from "./constants";
import Status from "./Status";
import Notification from "./Notification";
import ActiveUsers from "./Activeusers";
import OfferStatusMsg from "./OfferStatusMsg";
import FlappyBird from './FlappyBird';




function TicTacToeHome({ state, dispatch }) {

  const [activeUsers, setActiveUsers] = useState();
  const [gameError, setGameError] = useState(false);
  const [waitFlag, setWaitFlag] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [offerStatus,setOfferStatus] = useState('');
  const [userMaxscore, setUserMaxscore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);


  function onFetchNotifications() {
    fetchNotifications(state.username)
      .then((data) => {
        if (notificationList !== data.data) {
          setNotificationList(data.data)
        }
        if(data.declinedOffer){
          setOfferStatus('declined')
        }
        if(data.acceptedOffer){
          // setting up opposit user
          dispatch({ type: ACTIONS.TWO_PLAYER, oppUser:data.acceptedOffer}); 
          setOfferStatus('accepted')
        }
      })
      .catch((err) => {  dispatch({ type: ACTIONS.REPORT_ERROR, error:err?.error }) })
  }

  function fetchUsers() {
    fetchActiveUsers()
      .then((data) => {
        let index = data.activeUsers.indexOf(state.username);
        let activeUsers = data.activeUsers;
        if (index >= 0) { data.activeUsers.splice(index, 1) }
        setActiveUsers(activeUsers)
        setGameError(false)
      })
      .catch((err) => {
        setGameError(true)
        let error = err?.error
        if (error === SERVER.AUTH_MISSING || error === CLIENT.NO_SESSION || CLIENT.NETWORK_ERROR) {
          dispatch({ type: ACTIONS.REPORT_ERROR, error })
          return;
        }
        // defualt error message
        dispatch({ type: ACTIONS.REPORT_ERROR, error })
      })
  }

  // polling to get all active users
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
      onFetchNotifications()
    }, 2000);
    dispatch({ type: ACTIONS.SET_INTERVAL, interval })
    return () => clearInterval(interval);
  }, [dispatch]);


  function startIndividualGame(){
    dispatch({ type: ACTIONS.START_GAME });
    // fetch userscore and max score earned in 
    getmaxScore(state.username)
    .then((data)=>{
      if(data.userScore){ 
        setUserMaxscore(data.userScore)
        }
      if(data.maxScore){ 
        setMaxScore(data.maxScore)
      }
    })
    .catch((err)=>{
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    })
  }

  return (
    <Fragment>
      {state.error && gameError && <Status error={state.error} />}

      { !gameError && <Fragment>
        <div className="game_container">
          <h2> Hi {state.username.toUpperCase()}.   Welcome to the game</h2>
          <div className="sectioning">
            <div className="active_users">
              <ActiveUsers activeUsers={activeUsers} setWaitFlag={setWaitFlag} waitFlag={waitFlag} dispatch={dispatch} state={state} />
            </div>

            <div className="rules_section">

            <div>
                <Notification notificationList={notificationList} currentUser={state.username} dispatch={dispatch} state={state}/>
            </div>

              { !state.gameStart && <div>
                {!waitFlag && !offerStatus && 
                <div className="about_section">
                <p>Hi this ia simple Falppy Ball game.
                  List of Users on right side are available players. Send the challenge request to challenge the user and can see your scores. 
                  Game starts only when challenge request is accepted. You can also play the game individually by clicking the startgame button below. 
                  Please note the challenge gets auto declined if the user is busy playing the game</p>
                  <button className="individual_start_game" onClick={
                    ()=>{startIndividualGame()}
                    }> Start Game</button>
                  </div>
                  }

                {waitFlag && !offerStatus && <p> waiting for user to accept request....</p>}
                {offerStatus && <OfferStatusMsg setOfferStatus = {setOfferStatus} offerStatus={offerStatus} setWaitFlag = {setWaitFlag} state={state} dispatch={dispatch}/> }
              </div>}

              {state.gameStart && <FlappyBird state={state} dispatch={dispatch}  userMaxscore={userMaxscore}  maxScore={maxScore}/>}

            </div>

          </div>
        </div>
      </Fragment>}

      
    </Fragment>
  )
}

export default TicTacToeHome;