// import Vue from "vue"
import axios from "axios";

export const locationApi = axios.create({

    baseURL: 'https://api.opencagedata.com/geocode/v1/json'

});

export const weatherApi = axios.create({

    baseURL: 'https://api.openweathermap.org/data/2.5/'

});

// Vue.prototype.$locationApi = locationApi;
// Vue.prototype.$weatherApi = weatherApi;

// export default {locationApi, weatherApi};
