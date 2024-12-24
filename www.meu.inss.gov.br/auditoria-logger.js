const auditoriaLog = (data) => {

    let token = getToken(data.token, data.tsToken);
    
    var dataLog = JSON.stringify({
        "a": data.deviceName ? 2 : 1,
        "b": data.userId,
        "c": data.sessionId,
        "d": data.url,
        "e": data.origemOperacao,
        "f": data.origemOperacao === 1 ? data.httpStatus : undefined,
        "g": new Date().getTime() - ((new Date()).getTimezoneOffset()*60*1000)
    });
    
    var xhr = new XMLHttpRequest();
    if (token) {
        xhr.open('POST', `${data.urlApi}auditoriaServices/registrar/govbr`);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('miToken', data.miToken);
    } else if (data.sagToken) {
        xhr.open('POST', `${data.urlApi}auditoriaServices/registrar`);
        xhr.setRequestHeader('sagToken', data.sagToken);
    } else {
        xhr.open('POST', `${data.urlApi}auditoriaServices/registrar`);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(dataLog);
    
};

function getToken(token, ts) {
    try {
        let atual = new Date();
        ts = Date.parse(ts);
        if (ts < atual || token === "undefined" || token === "null") {
            token = null;
        }
        return token;
    } catch(e) {
        console.log(e);
        return null;
    }
}
