export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

/* eslint-disable */
import { API_DOMAIN } from '../constants';
import axios from 'axios';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}
const cookie = (name, value, options) => {
	if (typeof value !== 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options = Object.assign({}, options);
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, '');
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  const options = {
    method: 'POST',
    url: `${API_DOMAIN}/login/account`,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // body: `login=${creds.login}&password=${creds.password}`,
    data: {
      email: creds.login,
      password: creds.password
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return axios(options)
      .then(res => {
        if (res.data && res.data.code !== 0) {
          cookie('id_token', res.data.data.token, { path: '/', expires: 7 });
          dispatch(receiveLogin(res.data.data));
        } else {
          dispatch(loginError(res.data.message));
        }
      }).catch(err => console.log('Error: ', err));
    // .then(response =>
    //   response.json().then(user => ({ user, response })),
    // ).then(({ user, response }) => {
    //   if (!response.ok) {
    //     // If there was a problem, we want to
    //     // dispatch the error condition
    //     
    //     return Promise.reject(user);
    //   }
    //   // in posts create new action and check http status, if malign logout
    //   // If login was successful, set the token in local storage
    //   localStorage.setItem('id_token', user.id_token);
    //   // Dispatch the success action
    //   dispatch(receiveLogin(user));
    //   return 0;
    // }).catch(err => console.log('Error: ', err)); // eslint-disable-line
  };
}


/* eslint-enable  */

