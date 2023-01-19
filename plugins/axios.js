// 클라이언트 측 요청을 만들기 위해 사용되고 앞에 추가되는 기본 URL 정의
const baseUrl = process.env.request.prefixUrl

function _getDefaultMeta() {
  return {
    useTokenUpdate: false, // 받아온 response에서 token 값을 가져와 재 셋팅을 할 경우 true로 셋팅한다.
    useAuth: true, // 인증 모듈을 사용한다. false가 되었을 경우 401 상태에서도 Login 화면으로 가지 않는다. (i18n과 같은 특별한 경우에서만 사용)
    useResponseAll: false, // request 실행 이후, API로 돌아오는 Obj를 Axios response 전문으로 변경되어 전달한다. 기본은 false
    useProgress: true, // API 사용 간 Global Lock Progressive Bar 를 사용하는 것을 의미.
  }
}

function _log(res) {
  const response = res.response ? res.response : res

  const checkStatusCode = Math.floor(response.status / 400)
  const color = checkStatusCode < 1 ? '#58FA58' : '#FA5858'

  const status = response.status ? response.status : res.message
  console.groupCollapsed(
    `%c [${res.config.method}] ${res.config.url} - ${status}`,
    `background-color: ${color};`
  )
  console.group('[Request]')
  console.info('headers', res.config.headers || '')
  console.info('params', res.config.params || '')
  console.info('data', res.config.data || '')
  console.groupEnd()
  console.group('[Response]')
  console.info('headers', response.headers || '')
  console.info('data', response.data || '')
  console.groupEnd()
  console.groupEnd()
}

export default function ({ store, $axios }, inject) {
  const api = $axios.create({
    baseURL: $axios.defaults.baseURL + baseUrl,
    timeout: process.env.request.timeout,
  })

  api.onRequest((config) => {
    // method get 인 경우 IE11에서 캐싱 문제로 인하여 추가
    if (config.method.toLowerCase() === 'get') {
      if (config.params === undefined) {
        config.params = {}
      }
      config.params.t = new Date().getTime()
    }

    // meta 값 기본 정의
    if (!config.meta) config.meta = {}
    if (config.meta.usePoiAuthKey) {
      config.headers.apiVersion = '1.0.0'
      config.headers.apiType = '01'
      config.headers.devInfo = '03'
    }
    config.meta = Object.assign(_getDefaultMeta(), config.meta)

    // if (store.state.auth.user && store.state.auth.user.accessToken) {
    //   config.headers.Authorization = store.state.auth.user.accessToken
    // }

    return config
  })

  api.onRequestError((error) => {
    // 에러가 날경우 진행 부분
    console.error('[Client Error]', error) // for debug

    Promise.reject(error)
  })

  // axios의 response 인터셉터
  api.onResponse((response) => {
    let res = {}
    const meta = response.config.meta
    if (process.browser) {
      _log(response)
    }
    // axios를 통해 response 내역 중 data에 서버에서 response된 값이 들어온다.
    if (response.data) {
      res = response.data
    }

    if (meta.useResponseAll) return response
    return res
  })

  api.onResponseError((error) => {
    _log(error)
    // response 부분 객체 내 meta 사용을 위한 기본 값 셋팅
    console.log('error', error.response.data.message)
    if (error.response.data.message) {
      error = error.response.data.message
    }

    return Promise.reject(error)
  })

  inject('api', api)
}
