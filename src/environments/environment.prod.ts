export const environment = {
  production: true,
  keycloakConfig : {
    'url': 'http://app.dastan.eng.it:6060/auth',
    'realm': 'Finance',
    'clientId': 'AnubisAuth'
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
