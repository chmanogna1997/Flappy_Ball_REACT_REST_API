const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require('./sessions');
const notifications = require('./notifications');
const scores = require('./scores');

const PORT =  process.env.PORT || 3000;
const users = require('./users')

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// test
app.get('/test', (req,res)=>{
    return res.json({boom:'boom'})
})

// triggers when user sends a request to start game
app.post('/api/sendreq',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'noSession'})
        return
    }
    let sender = req.body.sender;
    let sentTo = req.body.sentTo;
    if(notifications.addRequest(sender, sentTo)){
        res.status(200).json({'sentTo':sentTo})
    }
})

app.get('/api/acceptingOffer/:acceptedUser/:byUser',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'noSession'})
        return
    }
    // clear data for this
    scores.clearUserData(req.params.acceptedUser, req.params.byUser)

    notifications.acceptedUser(req.params.acceptedUser, req.params.byUser)
    res.json({'offer':'accepted-sucess'})
})

app.get('/api/declineOffer/:declingUser/:byUser',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'noSession'})
        return
    }
    // adding it to declineQ
    notifications.reqDecline(req.params.declingUser, req.params.byUser)
    res.json({'offer':'declined-scussefully'})
})

// when user accepts the offer update
app.get('/api/OfferStatus/:offerStatus/:user',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'noSession'})
        return
    }
    notifications.updateList(req.params.offerStatus, req.params.user);
    res.status(200).json({updated: req.params.user})
})

app.get('/api/notifications/:user',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'noSession'})
        return
    }
    let notificationsList = notifications.notificationCheck(req.params.user);
    let declineList = notifications.OfferDeclineCheck(req.params.user);
    let acceptList = notifications.offerAcceptedCheck(req.params.user);
    res.status(200).json({'data':notificationsList, 'acceptedOffer':acceptList, 'declinedOffer':declineList})
})

// checking for user session
app.get('/api/session', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if( !sid || !username){
        res.status(401).json({ error: 'auth-missing' });
        return;
        }
     res.json({'user': username})
})

// post request : we get the username and create a session id to the user
app.post('/api/session', (req,res)=>{
    const username = req.body.username;
    if(!users.isValidUsername(username)){
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if( username.toLowerCase() === 'dog'){
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    res.cookie('sid', sid)
    users.wordFor[username] ||= '';
    return res.status(200).json({username})  
})

app.get('/api/users', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if( !sid || !username){
        res.status(401).json({ error: 'noSession' });
        return;
        }
    let activeUsers = sessions.activeUsers()
    res.json({'activeUsers':activeUsers})
});

// deleting the session
app.delete('/api/session', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid? sessions.getSessionUser(sid):'';
    if(sid){ res.clearCookie(sid)}
    if(username){ sessions.deleteSession(sid) }
    res.json({username})
})

// getting oPPUser Score
app.post('/api/sendscore', (req,res)=>{
    const score = req.body.score;
    const oppUser = req.body.oppUser;
    scores.oppUserScores(oppUser, score)
    res.status(200).json({'task':'completed'})
})

// sendinging oppUser score
app.get('/api/getOppUserScore/:oppUser',(req,res)=>{
    const oppUser = req.params.oppUser
    let oppUserScore = scores.sendoppUserScore(oppUser)
    res.status(200).json({'score':oppUserScore})
})

// getting individual score
app.post('/api/iscore',(req,res)=>{
    const score = req.body.score;
    const user = req.body.user
    scores.addScoreList(user,score)
    res.status(200).json({'added': true})
})
// get indival score and max score
app.get('/api/maxScore/:user',(req,res)=>{
    let user = req.params.user;
    let a = scores.sendIScore(user);
    res.status(200).json(a)
})










app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


