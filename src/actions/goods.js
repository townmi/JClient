export const CREATE_GOODS_REQUEST = 'CREATE_GOODS_REQUEST';
export const CREATE_GOODS_SUCCESS = 'CREATE_GOODS_SUCCESS';
export const CREATE_GOODS_FAILURE = 'CREATE_GOODS_FAILURE';

export const GET_GOODS_LIST_REQUEST = 'GET_GOODS_LIST_REQUEST';
export const GET_GOODS_LIST_SUCCESS = 'GET_GOODS_LIST_SUCCESS';
export const GET_GOODS_LIST_FAILURE = 'CREATE_GOODS_FAILURE';

/* eslint-disable */
import { API_DOMAIN } from '../constants';
import axios from 'axios';

function requestCreateGoods(creds) {
    return {
        type: CREATE_GOODS_REQUEST,
        isFetching: true,
        creds,
    };
}

export function receiveCreateGoods(goods) {
    return {
        type: CREATE_GOODS_SUCCESS,
        isFetching: false,
        goods: goods,
    };
}

function createGoodsError(message) {
    return {
        type: CREATE_GOODS_FAILURE,
        isFetching: false,
        message,
    };
}


export function createGoods(creds, history) {
    return (dispatch) => {
        if (!creds.picture) {
            dispatch(createGoodsError("picture 不能为空"));
            return;
        }
        dispatch(requestCreateGoods(creds));
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
            const options = {
                method: 'POST',
                url: `${API_DOMAIN}/goods/create`,
                data: {
                    name: creds.name,
                    sku: creds.sku,
                    price: creds.price,
                    desc: creds.description,
                    picture: path
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
                        dispatch(receiveCreateGoods(res.data.data));
                        history.push({
                            pathname: '/app/goods',
                        });
                    } else {
                        dispatch(createGoodsError(res.data.message));
                    }
                }).catch(err => console.log('Error: ', err));
        }).catch(err => {
            // dispatch(createGoodsError(res.data.message));
            console.log('Error: ', err);
        })
    }

}


function requestGetGoodsList(creds) {
    return {
        type: GET_GOODS_LIST_REQUEST,
        isFetching: true,
        creds,
    }
}

export function receiveGetGoodsList(goodsList) {
    return {
        type: GET_GOODS_LIST_SUCCESS,
        isFetching: false,
        goodsList: goodsList,
    };
}

function getGoodsListError(message) {
    return {
        type: GET_GOODS_LIST_FAILURE,
        isFetching: false,
        message,
    };
}

export function getGoodsList(creds) {
    const options = {
        method: 'GET',
        url: `${API_DOMAIN}/goods/list`,
        params: {
            limit: creds.limit,
            offset: creds.offset,
            sort: creds.sort
        },
    };

    return (dispatch) => {
        dispatch(requestGetGoodsList(creds))
        return axios(options)
            .then(res => {
                if (res.data && res.data.code !== 0) {
                    dispatch(receiveGetGoodsList(res.data.data));
                } else {
                    dispatch(getGoodsListError(res.data.message));
                }
            }).catch(err => console.log('Error: ', err));
    }
}