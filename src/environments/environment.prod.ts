export const environment = {
  production: true,
  keycloakConfig : {
    'url': 'http://app.dastan.eng.it:9003/auth',
    'realm': 'Offering_Solutions',
    'clientId': 'AnubisAuth',
    'credentials': {
      'secret': '298d2e59-d913-442c-a2f7-ec30ea47da9b'
    }
  },
  /*keycloakConfig : {
    'url': 'http://app.dastan.eng.it:9003/auth',
    'realm': 'Offering_solutions',
    'clientId': 'AnubisAuth'
  },*/
  /*keycloakConfig : {
    'url': 'http://localhost:7070/auth',
    'realm': 'Finance',
    'clientId': 'AnubisAuth'
  },*/
  //urlDockerProxy : "http://localhost:8080/dockerProxy_war/",
  urlDockerProxy : "http://app.dastan.eng.it:9004/dockerProxy",
  methodLoginPortainer :  "/loginPortainer",
  methodListContainers : "/listContainers",
  methodStartContainers : "/startContainer",
  methodStopContainers : "/stopContainer",
  dastanUrl : "http://app.dastan.eng.it/"
};
