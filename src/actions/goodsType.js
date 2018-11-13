export const CREATE_GOODS_TYPE_REQUEST = 'CREATE_GOODS_TYPE_REQUEST';
export const CREATE_GOODS_TYPE_SUCCESS = 'CREATE_GOODS_TYPE_SUCCESS';
export const CREATE_GOODS_TYPE_FAILURE = 'CREATE_GOODS_TYPE_FAILURE';

export const GET_GOODS_TYPE_LIST_REQUEST = 'GET_GOODS_TYPE_LIST_REQUEST';
export const GET_GOODS_TYPE_LIST_SUCCESS = 'GET_GOODS_TYPE_LIST_SUCCESS';
export const GET_GOODS_TYPE_LIST_FAILURE = 'GET_GOODS_TYPE_LIST_FAILURE';

/* eslint-disable */
import { API_DOMAIN } from '../constants';
import axios from 'axios';

function requestCreateGoodsType(creds) {
    return {
        type: CREATE_GOODS_TYPE_REQUEST,
        isFetching: true,
        creds,
    };
}

export function receiveCreateGoodsType(goodsType) {
    return {
        type: CREATE_GOODS_TYPE_SUCCESS,
        isFetching: false,
        goodsType: goodsType,
    };
}

function createGoodsTypeError(message) {
    return {
        type: CREATE_GOODS_TYPE_FAILURE,
        isFetching: false,
        message,
    };
}

export function createGoodsType(creds, history) {
    return (dispatch) => {
        if (!creds.picture) {
            dispatch(createGoodsTypeError("picture 不能为空"));
            return;
        }
        dispatch(requestCreateGoodsType(creds));
        return new Promise(function (resolve, reject) {
            let fd = new FormData();
            fd.append("file", creds.picture);
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
            let data = {
                name: creds.name,
                picture: path,
            }

            if (creds.type) {
                data.parentId = creds.type;
            }

            const options = {
                method: 'POST',
                url: `${API_DOMAIN}/goods/type/create`,
                data: data,
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
                        dispatch(receiveCreateGoodsType(res.data.data));
                        history.push({
                            pathname: '/app/goods',
                        });
                    } else {
                        dispatch(createGoodsTypeError(res.data.message));
                    }
                }).catch(err => console.log('Error: ', err));
        }).catch(err => {
            // dispatch(createGoodsError(res.data.message));
            console.log('Error: ', err);
        })
    }

}

function requestGetGoodsTypeList(creds) {
    return {
        type: GET_GOODS_TYPE_LIST_REQUEST,
        isFetching: true,
        creds,
    }
}

export function receiveGetGoodsTypeList(goodsTypeList) {
    return {
        type: GET_GOODS_TYPE_LIST_SUCCESS,
        isFetching: false,
        goodsTypeList: goodsTypeList,
    };
}

function getGoodsTypeListError(message) {
    return {
        type: GET_GOODS_TYPE_LIST_FAILURE,
        isFetching: false,
        message,
    };
}

export function getGoodsTypeList(creds) {
    const options = {
        method: 'GET',
        url: `${API_DOMAIN}/goods/type/list`,
        params: {
            limit: creds.limit,
            offset: creds.offset,
            sort: creds.sort
        },
    };

    return (dispatch) => {
        dispatch(requestGetGoodsTypeList(creds))
        return axios(options)
            .then(res => {
                if (res.data && res.data.code !== 0) {
                    dispatch(receiveGetGoodsTypeList(res.data.data));
                } else {
                    dispatch(getGoodsTypeListError(res.data.message));
                }
            }).catch(err => console.log('Error: ', err));
    }
}