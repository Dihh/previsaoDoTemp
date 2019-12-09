import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";
import * as moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-BR");
const axios = require("axios").default;

export default {
    getUserLocation: async (lat, lng) => {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
        );
        const endereco = response.data.results[0].formatted_address;
        return endereco;

    },
    getData: async (address) => {
        const Address = {}
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
        );
        if (response.data.results.length > 0) {
            Address.lat = response.data.results[0].geometry.location.lat;
            Address.lng = response.data.results[0].geometry.location.lng;
            Address.formatted_address = response.data.results[0].formatted_address;

        } else {
            Address.formatted_address = "endereço não encontrado";
            Address.lat = "";
            Address.lng = "";
        }
        return Address
    },
    getweather: async (lat, lng) => {
        const weather = {}
        const response = await axios.get(
            `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHERMAP_KEY}`
        );
        weather.weatherIcon = response.data.weather[0].icon;
        weather.weatherDescription = response.data.weather[0].description;
        weather.temp = `${Math.round(response.data.main.temp)} C°`;
        weather.temp_max = `Max: ${Math.round(
            response.data.main.temp_max
        )}`;
        weather.temp_min = `Min: ${Math.round(
            response.data.main.temp_min
        )}`;
        weather.humidity = `Umidade: ${response.data.main.humidity}`;
        return weather
    },
    nextWeather: async (lat, lng) => {
        let weathers = await axios.get(
            `https://openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=24&appid=${OPENWEATHERMAP_KEY}`
        );
        weathers = weathers.data.list.slice(1, 8);
        const weathersList = []
        weathers.forEach(el => {
            const date = new Date(el.dt * 1000);
            const newDate = moment(date);
            weathersList.push({
                data: newDate.format("ddd"),
                max: Math.round(el.temp.max),
                min: Math.round(el.temp.min),
                description: el.weather[0].main,
                img: el.weather[0].icon
            });
        });
        return weathersList;
    }
};