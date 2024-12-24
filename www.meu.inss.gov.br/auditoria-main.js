const getParams = (origemOperacao, url, httpStatus) => {
  
  if (!localStorage.getItem('userId')) {
    let userIdStorage = (new Date()).getTime() + '-' + Math.random().toString(36).substring(2);
    localStorage.setItem('userId', userIdStorage.substring(0, 25));
    window.auditoriaLogManual('evt-userId');
  }
  
  if (!sessionStorage.getItem('accessId')) {
    let accessIdStorage = (new Date()).getTime() + '-' + Math.random().toString(36).substring(2);
    sessionStorage.setItem('accessId', accessIdStorage.substring(0, 25));
    window.auditoriaLogManual('evt-sessionId');
  }

  let token = localStorage.getItem('ifs_auth');
  let tsToken = localStorage.getItem('ifs_ts');
  let miToken = localStorage.getItem('miToken');
  let deviceName = window._deviceName;
  let userId = localStorage.getItem('userId');
  let sessionId = sessionStorage.getItem('accessId');
  let urlApi = window.env.REACT_APP__URL_API || window.env.urlApi;
  let sagToken = sessionStorage.getItem('sagTkn');


  return { origemOperacao, token, tsToken, miToken, url, deviceName, 
    userId, sessionId, httpStatus, urlApi, sagToken };

}

// https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
(() => {
  let oldPushState = history.pushState;
  history.pushState = function pushState() {
      let ret = oldPushState.apply(this, arguments);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
  };

  let oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
      let ret = oldReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
  };

  window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
  });
})();

let fila = [];
let timeoutFila;
let desabilitarFila;
const verificarFila = (data) => {
  if (desabilitarFila) {
    return true;
  } else if (!window.firebaseLoaded) {
    if (data) {
      fila.push(data);
      if (fila.length > 10) {
        desabilitarFila = true;
        window.auditoriaLogManualForce('log-error-load-firebase');
        fila.forEach(data => {
          window.auditoriaLog(data); 
        })
        fila = [];
      }
    }
    if (timeoutFila) {
      clearTimeout(timeoutFila);
    }
    timeoutFila = setTimeout(verificarFila, 1000);
    return false;   
  } else if (fila.length > 0) {
    desabilitarFila = true;
    fila.forEach(data => {
      window.auditoriaLog(data); 
    })
    fila = [];
  }
  return true;
}

const verificarFiltro = (data) => {
  if (data.origemOperacao === 1 && window.env.REACT_APP__AUDITORIA_API_REGEX) {
    return new RegExp(window.env.REACT_APP__AUDITORIA_API_REGEX).test(data.url);
  } else if (data.origemOperacao === 2 && window.env.REACT_APP__AUDITORIA_FRONTEND_REGEX) {
    return new RegExp(window.env.REACT_APP__AUDITORIA_FRONTEND_REGEX).test(data.url);
  } else if (data.origemOperacao === 3 && window.env.REACT_APP__AUDITORIA_MANUAL_REGEX) {
    return new RegExp(window.env.REACT_APP__AUDITORIA_MANUAL_REGEX).test(data.url);
  }
  return true;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
if (window.Worker) {
  const auditoriaWorker = new Worker("auditoria-worker.js");
  window.auditoriaLog = (data, force) => { 
    if (force) {
      auditoriaWorker.postMessage(data); 
    } else if (verificarFila(data)) {
      if (verificarFiltro(data)) { 
        auditoriaWorker.postMessage(data); 
      } 
    }
  };
} else {
  console.log('Your browser doesn\'t support web workers.');
  window.auditoriaLog = (data, force) => { 
    if (force) {
      auditoriaLog(data); 
    } else if (verificarFila(data)) {
      if (verificarFiltro(data)) { 
        auditoriaLog(data); 
      } 
    }
  };
}

window.auditoriaLogApi = (url, httpStatus) => window.auditoriaLog(getParams(1, url, httpStatus));
window.auditoriaLogManual = (acao) => window.auditoriaLog(getParams(3, acao));
window.auditoriaLogManualForce = (acao) => window.auditoriaLog(getParams(3, acao), true);

window.addEventListener('locationchange', () => window.auditoriaLog(getParams(2, window.location.href)));
window.addEventListener("beforeunload", () => window.auditoriaLogManual(window.location.href.indexOf('v35') ? "evt-unload" : "evt-unload_v35"));

window.auditoriaLogManual(window.location.href.indexOf('v35') ? "evt-load" : "evt-load_v35");

window.onerror = (error, url, line) => {
  window.auditoriaLogManual('log-error-js: url=' + url + ', line: ' + line + ', error: ' + error);
};