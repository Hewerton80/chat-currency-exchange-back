import axios from 'axios';

const exchangeRatesApi = axios.create({
    baseURL: 'http://data.fixer.io/api/',
});
exchangeRatesApi.interceptors.request.use(config => {
    config.params = {
        access_key: process.env.API_KEY
    }
    return config;
})
export { exchangeRatesApi };