import { shallowMount } from '@vue/test-utils'
import mainComponent from '@/components/mainComponent.vue'
import axios from 'axios'
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";
import * as moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-BR");

jest.mock('axios')

describe('HelloWorld.vue', () => {

  const endereco = 'cardoso';

  axios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      results: [{
        geometry: {
          location: {
            lat: 1,
            lng: 2
          }
        },
        formatted_address: endereco
      }]
    }
  }))

  axios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      weather: [{
        icon: '10',
        description: 'test'
      }],
      main: {
        temp: 10.5
      }
    }
  }))

  axios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      list: []
    }
  }))

  const wrapper = shallowMount(mainComponent, {})
  it('input on change', async () => {
    expect(wrapper.vm.endereco).toBe('')
    const input = wrapper.find('input')
    input.setValue(endereco)
    // input.trigger('change')
    // await wrapper.vm.$nextTick();
    // expect(wrapper.vm.lat).toBe(1)
    // expect(wrapper.vm.lng).toBe(2)
    // await wrapper.vm.$nextTick();
    // expect(wrapper.vm.formatted_address).toBe(endereco)
    // expect(wrapper.vm.weather.weatherIcon).toBe(`10.png`)
    // expect(wrapper.vm.weather.weatherDescription).toBe('test')
  })
})
