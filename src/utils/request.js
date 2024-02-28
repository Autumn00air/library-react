import { useCurrentUser } from "@/utils/hoos";
import { message as AntdMessage } from "antd";
import axios from "axios";
import Router from "next/router";

//其实总的来说我们的请求使用了axios,方便做一些拦截，比如请求拦截，响应拦截等，其中做验证的主要是使用localstorage中的user对象作为验证token，放入请求头中

// axios实例化函数
export const CreateAxiosInstance = (config) => {
    //创建axios实例，withCredentials: 设置为 true，表示跨域请求时是否需要使用凭证。如果 withCredentials 为 true，那么请求会带上例如 cookies 的凭证信息。
    const instance = axios.create({
        timeout: 5000,
        withCredentials: true,
        ...config,
    });
    //添加实例的请求拦截器
    instance.interceptors.request.use(
        function (config) {
            //如果本地存储能够取到用户信息user，就将user._id添加到请求头中，否则添加了个空的字符串作为userToken
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            //如果本地没有user而且这也不是login中提交的请求的话，就重定向到登录页面
            if (Object.keys(user).length === 0 && config.url !== "/api/login") {

                console.log('%c [  ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', 2)
                // return Router.push("/login");
                Router.push("/login");
            }
            config.headers = {
                userToken: user?._id,
            };
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    //添加实例的响应拦截器
    instance.interceptors.response.use(
        //这个是处理响应成功的函数
        function (response) {
            const { status, data, message } = response;
            //状态成功，返回数据
            if (status === 200) {
                return data;
            } else if (status === 401) {
                //状态401表示缺乏目标资源要求的身份验证凭证，一般是过期了，发送的请求未得到满足。，跳转到登录页
                return Router.push("/login");
            } else {
                //其他问题，提示错误信息
                AntdMessage.error(message);
                return Promise.reject(response.data);
            }
        },
        //下面这个函数是处理响应失败的情况
        function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    return Router.push("/login");
                }
            }
            AntdMessage.error(error?.response?.data?.message || "服务端异常");
            return Promise.reject(error);
        }
    );
    //最后返回这个axios实例
    return instance;
};
//默认导出的是一个空的实例
//前面命名导出的是一个灵活的创造实例的函数，可以根据需要进行配置
const request = CreateAxiosInstance({});
export default request;