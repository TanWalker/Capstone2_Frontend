// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
  // api: 'http://10.0.12.64:3000/api',
  // api: 'http://localhost:3000/api',
  api: 'http://192.168.20.201:3000/api',
  upload_care_key : 'c7c05222d42cec64dcf7'
 },
 VERSION: require('../../package.json').version

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
