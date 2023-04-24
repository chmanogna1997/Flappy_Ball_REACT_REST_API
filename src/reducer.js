import { ACTIONS, LOGIN_STATUS, CLIENT } from "./constants";

export const initialState = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.IS_NOT_LOGEDIN,
    interval:null,
    gameStart: false,
    oppUser:'',
    scoreInterval:''
  };

  function reducer(state, action){
    switch(action.type){
        case ACTIONS.LOG_IN:
            return{
                ...state,
                loginStatus:LOGIN_STATUS.IS_LOGEDIN,
                username:action.username
            }
        
        case ACTIONS.REPORT_ERROR:
            return{
                ...state,
                error : action.error || 'ERROR'
            }
        case ACTIONS.GET_USERNAME:
            return{
                ...state,
                username : action.username
            }

        case ACTIONS.LOG_OUT:
            return{
                ...state,
                username : '',
                error : '', 
                loginStatus: LOGIN_STATUS.IS_NOT_LOGEDIN,
                interval:null,
                gameStart: false,
                oppUser:'',
                scoreInterval:''
            }

        case ACTIONS.SET_INTERVAL:
            return{  
                ...state,
                interval:action.interval
            }
        
        case ACTIONS.START_GAME:
            return {
                ...state,
                gameStart:true
            }
        
        case ACTIONS.STOP_GAME:
            return {
                ...state,
                gameStart:false,
                oppUser:''
            }

        case ACTIONS.TWO_PLAYER:
            return{
                ...state,
                oppUser:action.oppUser
            }

        case ACTIONS.SET_SCORE_INTERVAL:
            return{
                ...state,
                scoreInterval: action.scoreInterval
            }
        

        default: throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });

       

    }

  }

  export default reducer;