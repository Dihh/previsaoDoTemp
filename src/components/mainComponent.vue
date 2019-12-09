<template>
  <div>
    <div class="addres">
      <div class="input-div">
        <input
          type="text"
          v-model="address.endereco"
          @change="getData"
          placeholder="Digite sua localização"
        />
      </div>

      <div class="formatted_address">{{ address.formatted_address }}</div>
      <div>{{ address.date }}</div>
      <div class="weatherDescriptionText">
        {{ address.weather.weatherDescription }}
      </div>
      <div class="weather">
        <div>
          <img
            :src="
              `http://openweathermap.org/img/wn/${address.weather.weatherIcon}@2x.png`
            "
            alt=""
            class="main-icon"
            v-if="address.weather.weatherIcon"
          />
        </div>
        <div class="weatherDescription">
          <div class="weatherTemp">
            {{ address.weather.temp }}
          </div>
          <div>
            <div>{{ address.weather.temp_max }}</div>
            <div>{{ address.weather.temp_min }}</div>
            <div>{{ address.weather.humidity }}</div>
          </div>
        </div>
      </div>
      <div class="next">
        <div v-for="n in address.nextWeather" :key="n.id">
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
import * as moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-BR");

import api from "@/api/api";
export default {
  name: "mainComponent",
  props: {},
  data() {
    return {
      address: {
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
        date: "",
        time: ""
      }
    };
  },
  mounted() {
    let storage;
    try {
      storage = JSON.parse(localStorage.getItem("address"));
    } catch (e) {}

    if (storage) {
      const date = new Date();
      if (date.getTime() < storage.time) {
        console.log("use storage");
        this.address = storage;
      } else {
        console.log("storage minor");
        try {
          this.getUserLocation();
        } catch (e) {}
      }
    } else {
      console.log("No Storage");
      try {
        this.getUserLocation();
      } catch (e) {}
    }
  },
  methods: {
    async getUserLocation() {
      navigator.geolocation.getCurrentPosition(async data => {
        this.address.endereco = await api.getUserLocation(
          data.coords.latitude,
          data.coords.longitude
        );
        this.getData();
      });
    },
    async getData() {
      this.$store.commit("setLoader", true);
      try {
        const address = await api.getData(this.address.endereco);
        const weather = await api.getweather(
          address.lat,
          address.lng,
          address.formatted_address
        );
        this.address.nextWeather = await api.nextWeather();
        this.address.formatted_address = address.formatted_address;
        let date = new Date();
        date = new Date(
          `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()} ${date.getHours()}:00:00`
        );
        this.address.date = moment(date).format("LLLL");
        this.address.time = date.setHours(date.getHours() + 1);
        console.log(date.setHours(date.getHours() + 1));
        this.address.lat = address.lat;
        this.address.lng = address.lng;
        this.address.weather = weather;
        localStorage.setItem("address", JSON.stringify(this.address));
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("setLoader", false);
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
