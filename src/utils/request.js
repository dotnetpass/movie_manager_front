import fetch from 'dva/fetch';
import {notification} from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import NProgress from 'nprogress'

const codeMessage = {
    200: '操作成功',
    201: '更新成功',
    202: '系统正在处理你的请求...',
    204: '删除成功',
    400: '请求错误',
    401: '你没有权限进行此操作',
    403: '你没有权限进行此操作',
    404: '找不到资源',
    406: '请检查你的请求',
    410: '资源已被删除',
    422: '请检查输入信息是否正确',
    424: '服务器返回错误',
    500: '服务器抛出了一个错误',
    502: '网关错误',
    503: '超时了...',
    504: '网关超时了...',
};

const checkStatus = async response => {
    //setTimeout(()=>NProgress.done(),2000);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errorJson = await response.json();
    const errortext = errorJson.error || codeMessage[response.status] || response.statusText;
    if (!errortext) return response;
    if (response.status === 424)
        notification.error({
            message: `${codeMessage[response.status] || `错误 ${  response.status}`}`,
            description: errortext,
            duration: null
        });
    else
        notification.error({
            message: `${codeMessage[response.status] || `错误 ${  response.status}`}`,
            description: errortext,
        });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

function urlEncode(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (let i in param) {
            let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}

const cachedSave = (response, hashcode) => {
    /**
     * Clone a response data and store it in sessionStorage
     * Does not support data other than json, Cache only json
     */
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.match(/application\/json/i)) {
        // All data is saved as text
        response
            .clone()
            .text()
            .then(content => {
                sessionStorage.setItem(hashcode, content);
                sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
            });
    }
    return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    /**
     * Produce fingerprints based on url and parameters
     * Maybe url has the same parameters
     */

    //NProgress.start();

    let fetchUrl = options.query ? (url + '?' + urlEncode(options.query)) : url;
    const fingerprint = fetchUrl + (options.body ? JSON.stringify(options.body) : '');
    const hashcode = hash
        .sha256()
        .update(fingerprint)
        .digest('hex');

    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = {...defaultOptions, ...options};
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }
    if (!newOptions.notRequireAuth) {
        const authQuery = {uid: localStorage.getItem('id')};
        const query = newOptions.query ? {...newOptions.query, ...authQuery} : authQuery;
        fetchUrl = query ? (url + '?' + urlEncode(query)) : url;
    }

    const expirys = options.expirys && 60;
    // options.expirys !== false, return the cache,
    if (options.expirys !== false) {
        const cached = sessionStorage.getItem(hashcode);
        const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
        if (cached !== null && whenCached !== null) {
            const age = (Date.now() - whenCached) / 1000;
            if (age < expirys) {
                const response = new Response(new Blob([cached]));
                return response.json();
            }
            sessionStorage.removeItem(hashcode);
            sessionStorage.removeItem(`${hashcode}:timestamp`);
        }
    }



    return fetch(fetchUrl, newOptions)
        .then(checkStatus)
        .then(response => cachedSave(response, hashcode))
        .then(response => {
            // DELETE and 204 do not return data by default
            // using .json will report an error.
            // if (newOptions.method === 'DELETE' || response.status === 204) {
            //   return response.text();
            // }
            return response.json();
        }).then(json => {
            if (json.message) {
                notification.success({
                    message: `操作成功`,
                    description: json.message,
                });
            }
            return json;
        }).catch(e => {
            const status = e.name;
            if (status === 401) {
                // @HACK
                /* eslint-disable no-underscore-dangle */
                // window.g_app._store.dispatch({
                //   type: 'login/logout',
                // });
                router.push('/exception/403');
                return;
            }
            // environment should not be used
            if (status === 403) {
                router.push('/exception/403');
                return;
            }
            if (status <= 504 && status >= 500) {
                router.push('/exception/500');
                return;
            }
            if (status >= 404 && status < 422) {
                router.push('/exception/404');
            }
            return {};
        });
}
