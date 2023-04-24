
requestsQ = {};

declineUserQ = {};
acceptQ = {};

function addRequest(sender, sentTo) {
    if (requestsQ[sentTo]) {
        requestsQ[sentTo].push(sender)
    } else {
        requestsQ[sentTo] = [sender,];
    }
    return true
}

function OfferDeclineCheck(user) {
    return declineUserQ[user]
}

function offerAcceptedCheck(user) {
    return acceptQ[user]
}

function notificationCheck(user) {
    return requestsQ[user]
}

function reqDecline(declineUser, byUser) {
    if(requestsQ[byUser]){
    let index = requestsQ[byUser].indexOf(declineUser);
    if (index >= 0) { requestsQ[byUser].splice(index, 1) }
    }
    if (requestsQ[byUser] && requestsQ[byUser].length === 0) { delete requestsQ[byUser] }
    declineUserQ[declineUser] = byUser;
}

// adding to acceptQ and removing it from requestQ
function acceptedUser(acceptedUser, byUser) {
    let index = requestsQ[byUser].indexOf(acceptedUser)
    if (index >= 0) { requestsQ[byUser].splice(index, 1) }
    if (requestsQ[byUser].length === 0) { delete requestsQ[byUser] }
    acceptQ[acceptedUser] = byUser;
}

function updateList(offerStatus, user) {
    if (offerStatus === 'declined') { delete declineUserQ[user] }
    if (offerStatus === 'accepted') {
         delete acceptQ[user] 
        }
}

module.exports = {
    addRequest,
    notificationCheck,
    reqDecline,
    OfferDeclineCheck,
    updateList,
    acceptedUser,
    offerAcceptedCheck
}