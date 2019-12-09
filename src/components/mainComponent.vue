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
            v-if="weather.weatherIcon"
          />
        </div>
        <div class="weatherDescription">
          <div class="weatherTemp">
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
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";
import * as moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-BR");
const axios = require("axios").default;

import api from "@/api/api";
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
      nextWeather: [],
      date: ""
    };
  },
  mounted() {
    try {
      this.getUserLocation();
    } catch (e) {}
  },
  methods: {
    async getUserLocation() {
      navigator.geolocation.getCurrentPosition(async data => {
        this.endereco = await api.getUserLocation(
          data.coords.latitude,
          data.coords.longitude
        );
        this.getData();
      });
    },
    async getData() {
      try {
        const address = await api.getData(this.endereco);
        const weather = await api.getweather(
          address.lat,
          address.lng,
          address.formatted_address
        );
        this.nextWeather = await api.nextWeather();
        this.formatted_address = address.formatted_address;
        this.date = moment().format("LLLL");
        this.lat = address.lat;
        this.lng = address.lng;
        this.weather = weather;
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

.weatherTemp {
  font-size: 250%;
}

.input-div {
  margin-bottom: 20px;
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
  margin-bottom: 10px;
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
  font-size: 130%;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .input-div input {
    height: calc(1.7em + 0.75rem + 2px);
    font-size: 120%;
    line-height: 1.7;
  }

  .weatherDescription div {
    margin-left: 5px;
  }

  .formatted_address {
    font-size: 150%;
    margin-bottom: 20px;
  }
}
</style>
