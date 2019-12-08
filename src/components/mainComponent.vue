<template>
  <div>
    <input type="text" v-model="endereco" @change="getData" />
    <div class="addres">
      <div class="formatted_address">{{ formatted_address }}</div>
      <div>{{ date }}</div>
      {{ weather.weatherDescription }}
      <div class="weather">
        <div>
          <img
            :src="
              `http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`
            "
            alt=""
            class="main-icon"
          />
        </div>
        <div class="weatherDescription">
          <div>
            {{ weather.temp }}
          </div>
          <div>
            <div>{{ weather.temp_max }}</div>
            <div>{{ weather.temp_min }}</div>
            <div>{{ weather.humidity }}</div>
          </div>
        </div>
      </div>
      <div class="next">
        <div v-for="n in nextWeather" :key="n.id">
          <div>
            <img
              :src="`http://openweathermap.org/img/wn/${n.img}.png`"
              alt=""
              class="main-icon"
            />
          </div>
          <div>{{ n.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";
import * as moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-BR");

export default {
  name: "mainComponent",
  props: {},
  data() {
    return {
      endereco: "",
      lat: "",
      lng: "",
      formatted_address: "",
      weather: {
        weatherIcon: "",
        weatherDescription: "",
        temp: "",
        temp_max: "",
        temp_min: "",
        humidity: ""
      },
      nextWeather: [
        // { desc: "a", id: 1 },
        // { desc: "b", id: 1 },
        // { desc: "c", id: 1 }
      ],
      date: ""
    };
  },
  methods: {
    async getData() {
      const address = this.endereco;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
        );
        if (response.data.results.length > 0) {
          this.lat = response.data.results[0].geometry.location.lat;
          this.lng = response.data.results[0].geometry.location.lng;
          const formatted_address = response.data.results[0].formatted_address;
          this.getweather(this.lat, this.lng, formatted_address);
        } else {
          this.formatted_address = "endereço não encontrado";
          this.lat = "";
          this.lng = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getweather(lat, lng, formatted_address) {
      try {
        const weather = await axios.get(
          `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHERMAP_KEY}`
        );
        console.log(1, weather.data);
        this.weather.weatherIcon = weather.data.weather[0].icon;
        this.weather.weatherDescription = weather.data.weather[0].description;
        this.formatted_address = formatted_address;
        this.weather.temp = `${Math.round(weather.data.main.temp)} C°`;
        this.weather.temp_max = `Max: ${Math.round(
          weather.data.main.temp_max
        )}`;
        this.weather.temp_min = `Min: ${Math.round(
          weather.data.main.temp_min
        )}`;
        this.weather.humidity = `Umidade: ${weather.data.main.humidity}`;
        this.date = moment().format("LLLL");
      } catch (error) {
        console.log(error);
      }

      this.nextDays(lat, lng);
    },

    async nextDays(lat, lng) {
      this.nextWeather = [];
      try {
        const weathers = await axios.get(
          `https://openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=24&appid=${OPENWEATHERMAP_KEY}`
        );
        const weatherList = weathers.data.list.slice(1, 8);
        console.log(weatherList);
        weatherList.forEach(el => {
          this.nextWeather.push({
            data: new Date(el.dt * 1000),
            max: Math.round(el.temp.max),
            min: Math.round(el.temp.min),
            description: el.weather[0].main,
            img: el.weather[0].icon
          });
        });
        console.log(2, this.nextWeather);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addres {
  border: solid 1px #ddd;
  padding: 10px;
}

.formatted_address {
  font-size: 150%;
}

.weather {
  display: flex;
}

.weatherDescription {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weatherDescription div {
  margin-left: 10px;
}

.next {
  display: flex;
  justify-content: space-around;
}
</style>
