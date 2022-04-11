// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://monigate-capstone-ubuntu.azurewebsites.net/api',
  apiUrl: 'https://swp-monigate-ubuntu.azurewebsites.net/api',
  firebase: {
    apiKey: "AIzaSyA5P0-YKgjUaHKhwHk-5mci6qix4HW8PLc",
    authDomain: "monigate-admin-webapp.firebaseapp.com",
    projectId: "monigate-admin-webapp",
    storageBucket: "monigate-admin-webapp.appspot.com",
    messagingSenderId: "871094034864",
    appId: "1:871094034864:web:192bfc75c731afbca0b675",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
