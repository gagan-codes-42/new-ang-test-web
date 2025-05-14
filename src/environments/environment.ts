// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDLizUs6EffqdDJqXFbyTAAGSGnDP38zqs",
    authDomain: "epanipuricart-6bcc8.firebaseapp.com",
    projectId: "epanipuricart-6bcc8",
    storageBucket: "epanipuricart-6bcc8.firebasestorage.app",
    messagingSenderId: "528219949718",
    appId: "1:528219949718:web:2f9fefd7952099f97c90b7",
    measurementId: "G-ZC23L0779L"
  },
  serverURL: 'https://api.epanipuricart.co.in/franchisee',
  orderNowServerURL: 'https://order-api.epanipuricart.co.in/orderOnline',
  socketURL: 'https://order-api.epanipuricart.co.in/orderOnline',
  iotURL: 'https://iot.epanipuricart.co.in/wizard',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
