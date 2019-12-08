<template>
  <div>
    <div class="addres">
      <div class="input-div">
        <input
          type="text"
          v-model="endereco"
          @change="getData"
          placeholder="Digite sua localização"
        />
      </div>

      <div class="formatted_address">{{ formatted_address }}</div>
      <div>{{ date }}</div>
      <div class="weatherDescriptionText">{{ weather.weatherDescription }}</div>
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
          <div>{{ n.data }}</div>
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
        try {
          this.date = moment().format("LLLL");
        } catch (e) {}
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
        weatherList.forEach(el => {
          const date = new Date(el.dt * 1000);
          const newDate = moment(date);
          this.nextWeather.push({
            data: newDate.format("ddd"),
            max: Math.round(el.temp.max),
            min: Math.round(el.temp.min),
            description: el.weather[0].main,
            img: el.weather[0].icon
          });
        });
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
  /* border: solid 1px #ddd; */
  padding: 10px;
  border-radius: 10px;
  min-height: 300px;
}

.input-div {
  margin-bottom: 10px;
}

.input-div input {
  width: 95%;
  height: calc(0.7em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 0.7;
  color: #fff;
  background-color: #008baa;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-div input::placeholder {
  color: #ccc;
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
  font-size: 80%;
  margin-top: 10px;
}

.weatherDescriptionText {
  margin-top: 20px;
}
</style>
