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
  console.log(wrapper.vm);
  it('input on change', async () => {
    expect(wrapper.vm.endereco).toBe('')
    const input = wrapper.find('input')
    input.setValue(endereco)

  })
})
