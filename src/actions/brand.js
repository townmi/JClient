export const CREATE_BRAND_REQUEST = 'CREATE_BRAND_REQUEST';
export const CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
export const CREATE_BRAND_FAILURE = 'CREATE_BRAND_FAILURE';

export const GET_BRAND_LIST_REQUEST = 'GET_BRAND_LIST_REQUEST';
export const GET_BRAND_LIST_SUCCESS = 'GET_BRAND_LIST_SUCCESS';
export const GET_BRAND_LIST_FAILURE = 'GET_BRAND_LIST_FAILURE';

/* eslint-disable */
import { API_DOMAIN } from '../constants';
import axios from 'axios';

function requestCreateBrand(creds) {
    return {
        type: CREATE_BRAND_REQUEST,
        isFetching: true,
        creds,
    };
}

export function receiveCreateBrand(brand) {
    return {
        type: CREATE_BRAND_SUCCESS,
        isFetching: false,
        brand: brand,
    };
}

function createBrandError(message) {
    return {
        type: CREATE_BRAND_FAILURE,
        isFetching: false,
        message,
    };
}

export function createBrand(creds, history) {
    return (dispatch) => {
        if (!creds.logo) {
            dispatch(createBrandError("logo 不能为空"));
            return;
        }
        dispatch(requestCreateBrand(creds));
        return new Promise(function (resolve, reject) {
            let fd = new FormData();
            fd.append("file", creds.logo);
            const options = {
                method: 'POST',
                url: `//venuescore.staging.nightplus.cn/public/file/upload`,
                data: fd,
            };

            axios(options)
                .then(res => {
                    if (res.data != null && res.data.code === 200 && res.data.data != null && res.data.data.length > 0) {
                        resolve(res.data.data[0]);
                    } else {
                        reject(null);
                    }
                }).catch(err => {
                    reject(err);
                });
        }).then((path) => {
            const options = {
                method: 'POST',
                url: `${API_DOMAIN}/goods/brand/create`,
                data: {
                    name: creds.name,
                    logo: path
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
            axios(options)
                .then(res => {
                    if (res.data && res.data.code !== 0) {
                        dispatch(receiveCreateBrand(res.data.data));
                        history.push({
                            pathname: '/app/brand',
                        });
                    } else {
                        dispatch(createBrandError(res.data.message));
                    }
                }).catch(err => console.log('Error: ', err));
        }).catch(err => {
            dispatch(createBrandError(err.toString()));
            console.log('Error: ', err);
        })
    }

}

function requestGetBrandList(creds) {
    return {
        type: GET_BRAND_LIST_REQUEST,
        isFetching: true,
        creds,
    }
}

export function receiveGetBrandList(brandList) {
    return {
        type: GET_BRAND_LIST_SUCCESS,
        isFetching: false,
        brandList: brandList,
    };
}

function getBrandListError(message) {
    return {
        type: GET_BRAND_LIST_FAILURE,
        isFetching: false,
        message,
    };
}

export function getBrandList(creds) {
    const options = {
        method: 'GET',
        url: `${API_DOMAIN}/goods/brand/list`,
        params: {
            limit: creds.limit,
            offset: creds.offset,
            sort: creds.sort
        },
    };

    return (dispatch) => {
        dispatch(requestGetBrandList(creds))
        return axios(options)
            .then(res => {
                if (res.data && res.data.code !== 0) {
                    dispatch(receiveGetBrandList(res.data.data));
                } else {
                    dispatch(getBrandListError(res.data.message));
                }
            }).catch(err => console.log('Error: ', err));
    }
}