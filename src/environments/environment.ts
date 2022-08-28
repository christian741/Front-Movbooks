// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'https://localhost:44365/api',
  tokenName: 'access_token',
  tmdbApi: 'https://api.themoviedb.org/3',
  tmdbApiKey: '09a003a51659fc7a28f99e16d3a2a980',
  movieImgUrl: 'https://image.tmdb.org/t/p',
  googleBooksApi: 'https://www.googleapis.com/books/v1',
  blacklistedRoutes: [
    'https://localhost:44365/api/account/login',
    'https://localhost:44365/api/account/register',
  ],
  googleBooks:{
    EnableTrackingGenders : true,
  },
  movieApi:{
    EnableTrackingGenders : true,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
