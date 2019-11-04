// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
