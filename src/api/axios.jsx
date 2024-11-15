import axios from "axios";

const baseUrl = '/api'

// axios的二次封装
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig(){
    const config = {
      baseUrl: this.baseUrl,
      header: {}
    }
    return config
  }
  
  interceptors(instance){
    // 添加请求拦截器
    instance.interceptors.request.use(function (config){
      // 在发送之前想做什么
      return config;
    }, function(error) {
      // 对请求错误做什么
      return Promise.reject(error);
    })

    // 添加响应拦截器
    instance.interceptors.response.use(function (response){
      // 在响应数据做什么，2xx范围的状态码会触发该函数
      return response;
    }, function(error) {
      // 对响应错误做什么，超出2xx范围的状态码会触发该函数
      return Promise.reject(error);
    });
  }

  request(options) {
    
    // 创建axios实例
    const instance = axios.create()
    // 实例拦截器的绑定
    options = {...this.getInsideConfig(), ...options}
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)