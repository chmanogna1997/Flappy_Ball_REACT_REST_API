import { Fragment, useEffect, useState, useCallback } from "react";
import Gamebox from './Gamebox';
import { BIRD, GAMEBOX, OBSTACLE, ACTIONS } from './constants';
import Bird from "./Bird";
import Obstacle from "./Obstacle";
import './FlappyBird.css';
import { fetchSendScore, fetchOppUserScore, saveIndividualUserScore } from './services';

function FlappyBird({ state, dispatch, userMaxscore, maxScore }) {

    // initially we are stting the positin of bird to middle of the game box
    const [birdPosition, SetBirdPosition] = useState(200);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [obstacleHeight, setObstacleHeight] = useState(200);
    const [obstacleLeft, setObstacleLeft] = useState(GAMEBOX.WIDTH - OBSTACLE.WIDTH);
    const [score, setScore] = useState(0);
    const [oppUserScore, setOppUserScore] = useState(0);
    const [showWinner, setShowWinner] = useState('')
    const [showScore, setShowScore] = useState(false)
    const bottomObstacleHeight = GAMEBOX.HEIGHT - OBSTACLE.GAP - obstacleHeight;


    // goHome
    function goHome(e) {
        if (showScore && !gameHasStarted) {
            // clear interval
            clearInterval(state.scoreInterval)
            // stop game
            dispatch({ type: ACTIONS.STOP_GAME })
        }
    }

    // on gamestop
    const stopGame = useCallback(() => {
        if (oppUserScore > score) {
            setShowWinner(state.oppUser + ' WINS')
        }
        else if (oppUserScore === score) {
            setShowWinner('ITS A DRAW')
        }
        else {
            setShowWinner(state.username + ' WINS')
        }
    }, [oppUserScore, score, state.oppUser, state.username]);

    // getting the score
    useEffect(() => {
        const collisionAtTop = birdPosition < obstacleHeight && birdPosition >= 0;
        const collisionAtBottom = birdPosition <= GAMEBOX.HEIGHT && birdPosition >= GAMEBOX.HEIGHT - bottomObstacleHeight
        if (obstacleLeft >= 0 &&
            obstacleLeft <= OBSTACLE.WIDTH &&
            (collisionAtBottom || collisionAtTop)
        ) {
            setGameHasStarted(false)
            setShowScore(true)
            stopGame()
            // sending score to backend
            if (gameHasStarted && state.gameStart) {
                saveIndividualUserScore(score, state.username)
                    .catch((err) => {
                        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
                    })
            }
        }
    }, [dispatch, score, obstacleLeft, birdPosition, bottomObstacleHeight, obstacleHeight, stopGame, state.username])

    // making the bird drop: can be done by adjusting the height
    useEffect(() => {
        let birdId;
        if ((birdPosition < GAMEBOX.HEIGHT - BIRD.SIZE) && gameHasStarted) {
            birdId = setInterval(() => {
                SetBirdPosition((birdPosition) => birdPosition + BIRD.GRAVITY)
            }, 50)
        }
        return () => {
            clearInterval(birdId)
        }
    }, [gameHasStarted, SetBirdPosition, birdPosition]);

    // making obstacles move to left at intervals
    useEffect(() => {
        let obstacleId
        if (gameHasStarted && obstacleLeft >= 0) {
            obstacleId = setInterval(() => {
                setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
            }, 30);
            return () => {
                clearInterval(obstacleId)
            }
        } else {
            setObstacleLeft(GAMEBOX.WIDTH - OBSTACLE.WIDTH);
            // changing the height randomly
            let randomHeight = Math.floor(Math.random() * (GAMEBOX.HEIGHT - OBSTACLE.GAP))
            // obscale comming to left means => there is no colloision hence incermenting the score
            if (gameHasStarted && state.gameStart) {
                setObstacleHeight(randomHeight)
                setScore((score) => score + 1)
            }
        }
    }, [gameHasStarted, obstacleLeft, state.gameStart])

    function jumpbird(e) {
        // game starts when user clicks on the div
        if (!gameHasStarted) {
            setGameHasStarted(true)
        }
        // jumping bird by adjusting the height
        let newBirdPosition = birdPosition - BIRD.JUMPHEIGHT;
        // if bird goes out of Gamebox while jumpoing upward: set height to 0
        if (newBirdPosition < 0) {
            SetBirdPosition(0)
        } else {
            SetBirdPosition(newBirdPosition)
        }
    }

    // sending my score 
    useEffect(() => {
        const scoreInterval = setInterval(() => {
            // sending  your scor to the opponent
            fetchSendScore(score, state.username)
                .catch((err) => {
                    dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
                })

            // getting opppnent score
            if (state.oppUser) {
                fetchOppUserScore(state.oppUser)
                    .then((data) => {
                        if (oppUserScore !== data.score) {
                            setOppUserScore(data.score)
                        }
                    })
                    .catch((err) => {
                        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
                    })
            }
        }, 2000);
        dispatch({ type: ACTIONS.SET_SCORE_INTERVAL, scoreInterval })
        return () => clearInterval(scoreInterval);
    }, [score, dispatch, oppUserScore, state.username, state.oppUser]);

    return (
        <Fragment>

            {showScore && <div className="score_section">
                {state.oppUser && <div> Your Opponent {state.oppUser} Score is: {oppUserScore} </div>}
                <div className="final_score_section"> Your Score is: {score}</div>
                {state.oppUser && <div>{showWinner}</div>}
                <div className="stopGame_section"> <button onClick={() => goHome()}>Back Home</button> </div>
            </div>}

            {!showScore && <div className="flappy_bird_container"
                onClick={(e) => jumpbird(e)}
            >
                <div className="show_rules_score">
                    <div className="game_rules">
                    Play flappy ball Click on the screen to get started. Fly the ball as far as you can without hitting a pipe.
                    </div>
                    {state.oppUser && <h3> Your Opponent {state.oppUser} Score is: {oppUserScore} </h3>}
                    {maxScore && <h2> Highest score : {maxScore}</h2>}
                    {/* {userMaxscore && <div> {state.username} your hihset score is {userMaxscore} </div>} */}
                    <h3> Your Score : {score}</h3>
                </div>
                {/* {state.oppUser && <div> Your Opponent {state.oppUser} Score is {oppUserScore} </div>} */}
                <Gamebox height={GAMEBOX.HEIGHT} width={GAMEBOX.WIDTH} >
                    <Obstacle
                        top={0}
                        position='relative'
                        width={OBSTACLE.WIDTH}
                        height={obstacleHeight}
                        left={obstacleLeft} />
                    <Bird size={BIRD.SIZE} top={birdPosition} />
                    <Obstacle
                        top={GAMEBOX.HEIGHT - (obstacleHeight + bottomObstacleHeight)}
                        position='relative'
                        width={OBSTACLE.WIDTH} height={bottomObstacleHeight}
                        left={obstacleLeft} />
                </Gamebox>
            </div>}
        </Fragment>
    )

}

export default FlappyBird;
