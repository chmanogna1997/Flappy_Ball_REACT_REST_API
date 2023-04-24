export function fetchSid() {
    return fetch('/api/session', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .catch((err) => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            }
            else {
                return response.json()
            }
        })
}

export function fetchLogin(username) {
    return fetch('api/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username }),
    })
        .catch((err) => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
}

export function fetchActiveUsers() {
    return fetch('/api/users', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE'
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
}

export function fetchSendReq(sender, sentTo) {
    return fetch('/api/sendreq', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'sender': sender, 'sentTo': sentTo }),
    })
        .catch((err) => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
}

export function fetchNotifications(user) {
    let url = '/api/notifications/' + user;
    return fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function fetchDeclineUser(declinguser, byuser) {
    let url = '/api/declineOffer/' + declinguser + '/' + byuser;
    return fetch(url, {
        method: 'GET'
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function updateNotificationList(offerStatus, user) {
    let url = '/api/OfferStatus/' + offerStatus + '/' + user;
    return fetch(url, {
        method: 'GET'
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function fetchAcceptingUser(acceptingUser, byUser) {
    let url = '/api/acceptingOffer/' + acceptingUser + '/' + byUser;
    return fetch(url, {
        method: 'GET'
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function fetchSendScore(score, oppUser) {
    return fetch('/api/sendscore', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'score': score, 'oppUser': oppUser }),
    })
        .catch((err) => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
}

export function fetchOppUserScore(oppUser) {
    let url = '/api/getOppUserScore/' + oppUser;
    return fetch(url, {
        method: 'GET'
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}

export function saveIndividualUserScore(score, user) {
    return fetch('/api/iscore', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'score': score, 'user': user }),
    })
        .catch((err) => Promise.reject({ error: 'networkError' }))
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
}

export function getmaxScore(user) {
    let url = '/api/maxScore/' + user
    return fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err))
            } else {
                return response.json()
            }
        })
        .catch((err) => Promise.reject({ error: 'networkError' }))
}



