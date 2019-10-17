export const environment = {
  production: true,
  /*keycloakConfig : {
    'url': 'http://app.dastan.eng.it:6060/auth',
    'realm': 'Finance',
    'clientId': 'AnubisAuth'
  },*/
  keycloakConfig : {
    'url': 'http://localhost:7070/auth',
    'realm': 'Finance',
    'clientId': 'AnubisAuth'
  },
  urlDockerProxy : "http://localhost:8080/dockerProxy_war",
  methodLoginPortainer :  "/loginPortainer",
  methodListContainers : "/listContainers",
  methodStartContainers : "/startContainer",
  methodStopContainers : "/stopContainer",
};
