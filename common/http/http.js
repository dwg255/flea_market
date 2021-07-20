import Request from '@/common/luch-request/luch-request/index.js'

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {}
	return token
}

const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = 'http://localhost:8080',
		config.header = {
			...config.header,
		}
	return config
})


http.interceptors.request.use((config) => {
	/* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,

	}
	config.custom = {
		auth: true, // 是否传token
		loading: true // 是否使用loading
	}
	if (config.custom.auth) {
		config.header.token = getTokenStorage()
	}
	if (config.custom.loading) {
		uni.showLoading()
	}
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => {
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	return response
}, (response) => {
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	return Promise.reject(response)
})

export default {
	http
}
