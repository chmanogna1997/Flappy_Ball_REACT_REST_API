export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
}

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    UNKNOWN_ACTION: 'unknownAction',
  };

export const LOGIN_STATUS = {
    IS_LOGEDIN : 'loggedin',
    IS_NOT_LOGEDIN : 'notloggedin',
    LOGIN_PENDING : 'pending'
}

export const BIRD = {
  SIZE : 25,
  GRAVITY:3,
  JUMPHEIGHT:60
}

export const GAMEBOX ={
  WIDTH : 500,
  HEIGHT : 490
}

export const OBSTACLE = {
  WIDTH : 30,
  GAP:150
}

  export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [CLIENT.NO_SESSION] : 'Session TimedOut. Please logout and login again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.SESSION_LOST] : 'Session TimedOut. Please logout and login again',
    

    default: 'Something went wrong.  Please try again',
  };

  export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',
    GET_USERNAME: 'getUsername',
    REPORT_ERROR: 'reportError',
    SET_INTERVAL:'setInterval',
    START_GAME: 'startGame',
    TWO_PLAYER:'twoPlayer',
    STOP_GAME : 'stopGame',
    SET_SCORE_INTERVAL:'setScoreInterval'

  }
  