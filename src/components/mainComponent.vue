<template>
  <div>
    <input type="text" v-model="endereco" @change="getData" />
    <div class="addres">
      <div>Endereço: {{ this.formatted_address }}</div>
      <div>Lat: {{ this.lat }}<br />Long: {{ this.lng }}</div>
      <div>
        <img :src="weatherIcon" alt="" /><br />
        {{ weatherDescription }}
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";

export default {
  name: "mainComponent",
  props: {},
  data() {
    return {
      endereco: "",
      lat: "",
      lng: "",
      formatted_address: "",
      weatherIcon: "",
      weatherDescription: ""
    };
  },
  methods: {
    async getData() {
      const address = this.endereco;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
        );
        console.log("a");
        if (response.data.results.length > 0) {
          this.lat = response.data.results[0].geometry.location.lat;
          this.lng = response.data.results[0].geometry.location.lng;
          this.formatted_address = response.data.results[0].formatted_address;
          this.weather = "";

          // try {
          //   const weather = await axios.get(
          //     `https://openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${OPENWEATHERMAP_KEY}`
          //   );
          //   console.log(weather);
          //   this.weatherIcon = `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`;
          //   this.weatherDescription = weather.data.weather[0].description;
          // } catch (error) {
          //   console.log(error);
          // }
        } else {
          this.formatted_address = "endereço não encontrado";
          this.lat = "";
          this.lng = "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
