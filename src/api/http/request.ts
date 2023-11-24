import axios from 'axios'
// import { uuidv4 } from '/@/utils/uuid'
// import { CURRENT_CONFIG } from './config'
import { message } from 'ant-design-vue'
import router from '@/router'
// import { ELocalStorageKey, ERouterName, EUserType } from '@/types/enums'
export * from './type'

const REQUEST_ID = 'X-Request-Id'
function getAuthToken () {
  return localStorage.getItem('Authorization')
}

const instance = axios.create({
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 12000,
})

instance.interceptors.request.use(
  config => {
    const token = getAuthToken()

    if (token && (config.headers.Authorization = token)) {
      // config.headers['Authorization'] = token
      config.headers['Authorization'] = token
    }

    // config.headers[ELocalStorageKey.Token] = getAuthToken()
    // config.headers[REQUEST_ID] = uuidv4()
    config.baseURL = import.meta.env.VITE_APP_baseURL
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    // console.info('URL: ' + response.config.baseURL + response.config.url, '\nData: ', response.data, '\nResponse:', response)
    if (response.data.code && response.data.code !== 0) {
      // message.error(response.data.message)
      // return Promise.reject(response.data.msg)
      return Promise.reject(response.data)
    }
    return response
  },
  err => {
    const requestId = err?.config?.headers && err?.config?.headers[REQUEST_ID]
    if (requestId) {
      console.info(REQUEST_ID, '：', requestId)
    }
    console.info('url: ', err?.config?.url, `【${err?.config?.method}】 \n>>>> err: `, err)

    let description = '-'
    if (err.response?.data && err.response.data.message) {
      description = err.response.data.message
    }
    if (err.response?.data && err.response.data.result) {
      description = err.response.data.result.message
    }
    // @See: https://github.com/axios/axios/issues/383
    if (!err.response || !err.response.status) {
      message.error('The network is abnormal, please check the backend service and try again')
      return
    }
    if (err.response?.status !== 200) {
      // message.error(`ERROR_CODE: ${err.response?.status}`)
      // message.error(`${err.response.data.message}`)

      return Promise.reject(err.response)
    }
    // if (err.response?.status === 403) {
    //   // window.location.href = '/'
    // }
    if (err.response?.status === 401) {
      console.error(err.response)
      const flag: number = Number(localStorage.getItem('flag'))
      switch (flag) {
        case 1:
          router.push('project')
          break
        case 2:
          router.push('pilot-login')
          break
      }
    }

    return Promise.reject(err)
  },
)

export default instance
