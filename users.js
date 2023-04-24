wordFor = {}
function isValidUsername(username){
    let isvalid = true
    isvalid = isvalid && username.trim();
    isvalid = isvalid && username.match(/^[A-Za-z0-9_]+$/);
    return isvalid;
}

function isValidWord(word){
    let isValid = true;
    isValid = isValid && word.trim();
    isValid = isValid && word.match(/^[A-Za-z]*$/);
    return isValid
}

module.exports = 
{isValidUsername,
    isValidWord,
    wordFor

}
