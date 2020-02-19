/**
 * Created by Administrator on 2020/2/5.
 */
import axios from 'axios'
const github_base_url = 'https://api.github.com'
const isServer = typeof window === 'undefined'
const tool = {

    async requestGithub(method, url, data, headers) {
        return await axios({
            method,
            url: `${github_base_url}${url}`,
            data,
            headers,
        })
    },
    async request({method = 'GET', url, data = {}}, req, res) {
        if (!url) {
            throw Error('url must provide')
        }
        if (isServer) {
            const session = req.session
            const githubAuth = session.githubAuth || {}
            const headers = {}
            if (githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${
                    githubAuth.access_token
                    }`
            }
            return await requestGithub(method, url, data, headers)
        } else {
            // /search/respos
            return await axios({
                method,
                url: `/github${url}`,
                data,
            })
        }
    },
    ajax(param) {
        let ajax;
        let config = {
            url: param.url, //请求url
            data: param.data || {}, //请求参数
            type: param.type || 'post', //请求方式，默认为post
            success: param.success, //请求成功回调函数
            error: param.error, //请求失败回调函数
        }
        if (!config.url) {
            alert('url required');
            return
        }
        if (config.type.toUpperCase() == 'POST') {
            ajax = axios.post(config.url, config.data);
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            ajax = axios.get(config.url, {
                params: config.data
            });
        }
        ajax.then(response => {
            if (typeof config.success === "function") {
                // if (response.data.code === 302) {
                //     const local = window.location;
                //     window.location.href = `http://${local.host}${local.pathname}#/login`
                // }
                config.success(response.data);
            }
        }).catch(error => {
            // config.error(error);
        })
    },
};
module.exports = tool;