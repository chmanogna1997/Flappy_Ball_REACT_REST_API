const uuid = require('uuid').v4;
// session id to username mapping
sessions = {}

function getSessionUser(sid){
    return sessions[sid]
}

function addSession(username){
    const sid = uuid();
    sessions[sid] = username
    return sid
}

function deleteSession(sid){
    delete sessions[sid];
}

function activeUsers(){
    return [...new Set(Object.values(sessions))]
}



module.exports = { 
    getSessionUser,
    addSession,
    deleteSession,
    activeUsers
}