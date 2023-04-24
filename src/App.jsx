import './App.css';
import { useReducer, useEffect, useState, Fragment } from 'react';
import Status from './Status';
import Login from './Login';
import Header from './Header';
import TicTacToeHome from './TicTacToeHome';
import {fetchSid} from './services';
import { ACTIONS } from './constants';
import reducer, {initialState} from './reducer';
import { LOGIN_STATUS } from './constants';


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const[appError, setAppError] = useState(false)

    useEffect(()=>{
        fetchSid()
        .then((data)=> {

          setAppError(false)
          // console.log("in data", data)
          let username = data.user;
          dispatch({ type: ACTIONS.LOG_IN, username}); 
        })
        .catch((err)=> { 
          setAppError(true)
          let error = err?.error
          // console.log(" the reeor in app.jsx is", error)
          dispatch({type: ACTIONS.REPORT_ERROR, error}) 
        })
        
    },[state.loginStatus])

  return (
   
    <div className="App">
      <Header state = {state} dispatch = {dispatch} />
      <Fragment>
      {state.loginStatus === LOGIN_STATUS.IS_NOT_LOGEDIN  && <Login state = {state} dispatch = {dispatch}/> }
      {state.loginStatus === LOGIN_STATUS.IS_LOGEDIN && <TicTacToeHome state={state} dispatch={dispatch}/>}
      {state.error && appError && state.error !=='auth-missing' && <Status error={state.error}/> }
      </Fragment>
    </div>
  );
}

export default App;
