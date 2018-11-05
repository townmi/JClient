/* @flow */

// import fetch from 'isomorphic-fetch';
/* eslint-disable */
import { API_DOMAIN } from './constants';
import axios from 'axios';

function createFetch() {
  
  return (url, options) => {
    o = {
      ...defaults,
      ...options
    }
    const defaults = {
      method: 'POST',
      url: `${API_DOMAIN}${url}`,
    }
    console.log(options)
    axios(options);
  }
}
export default createFetch;
/* eslint-enable  */

// type Options = {
//   baseUrl: string,
//   cookie?: string,
// };

// /**
//  * Creates a wrapper function around the HTML5 Fetch API that provides
//  * default arguments to fetch(...) and is intended to reduce the amount
//  * of boilerplate code in the application.
//  * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
//  */
// function createFetch({ baseUrl, cookie }: Options) {
//   // NOTE: Tweak the default options to suite your application needs
//   const defaults = {
//     method: 'POST', // handy with GraphQL backends
//     mode: baseUrl ? 'cors' : 'same-origin',
//     credentials: baseUrl ? 'include' : 'same-origin',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       ...(cookie ? { Cookie: cookie } : null),
//     },
//   };

//   return (url, options) => ((url.startsWith('/graphql') || url.startsWith('/api')) ?
//     fetch(`${baseUrl}${url}`, {
//       ...defaults,
//       ...options,
//       headers: {
//         ...defaults.headers,
//         ...(options && options.headers),
//       },
//     }) : fetch(url, options));
// }

// export default createFetch;
