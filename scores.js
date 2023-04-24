
let scoreList = {};

let individualScoreList ={}

function oppUserScores(oppUser, score) {
    scoreList[oppUser] = score
}

function clearUserData(user1, user2){
    if(scoreList[user1]){  delete scoreList[user1];  }
    if(scoreList[user2]){  delete scoreList[user2];  }
}

function sendoppUserScore(oppUser){
    return scoreList[oppUser]
}

function sendIScore(user){
    let userScore = individualScoreList[user];
    let maxScore =  maxInScore();
          
    return {'userScore':userScore, 'maxScore':maxScore}
}

function maxInScore(){
    let scoreArray = Object.values(individualScoreList);

    let maxScore;
    if(scoreArray){
        maxScore = Math.max(scoreArray);
    }
    return maxScore;
}

function addScoreList(user,score){
    if(individualScoreList[user]){
        if(score > individualScoreList[user]){
            individualScoreList[user] = score
        }
    }
    else{
        individualScoreList[user] = score;
    }
}

module.exports = {
    oppUserScores,
    sendoppUserScore,
    addScoreList,
    sendIScore,
    maxInScore,
    clearUserData
}