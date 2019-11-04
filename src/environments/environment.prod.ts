export const environment = {
  production: true,
  keycloakConfig : {
    'url': 'http://app.dastan.eng.it:9003/auth',
    'realm': 'Offering_solutions',
    'clientId': 'AnubisAuth',
    'credentials': {
      'secret': '69887c97-01d7-430e-ad73-d48ca23a1081'
    }
  },
  /*keycloakConfig : {
    'url': 'http://localhost:7070/auth',
    'realm': 'Finance',
    'clientId': 'AnubisAuth'
  },*/
  //urlDockerProxy : "http://localhost:8080/dockerProxy",
  urlDockerProxy : "http://localhost:4040/dockerProxy",
  methodLoginPortainer :  "/loginPortainer",
  methodListContainers : "/listContainers",
  methodStartContainers : "/startContainer",
  methodStopContainers : "/stopContainer",
  dastanUrl : "http://app.dastan.eng.it/"
};
