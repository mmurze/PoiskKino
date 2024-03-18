import axios from 'axios';

let config = {
	baseURL: 'http://localhost:3001/'
};

const httpClient = axios.create(config);

const loggerInterceptor = config => {
	/** как-то обрабатываем логи */
	return config;
}
