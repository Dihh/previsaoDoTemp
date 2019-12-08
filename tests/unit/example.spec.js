import { shallowMount } from '@vue/test-utils'
import mainComponent from '@/components/mainComponent.vue'
import axios from 'axios'
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from "@/API_KEY";

jest.mock('axios')

describe('HelloWorld.vue', () => {

  const endereco = 'cardoso';

  axios.get.mockImplementation(() => Promise.resolve({
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

  const wrapper = shallowMount(mainComponent, {})
  it('input on change', async () => {
    expect(wrapper.vm.endereco).toBe('')
    const input = wrapper.find('input')
    input.setValue(endereco)
    input.trigger('change')
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${GOOGLE_API_KEY}`)
    expect(wrapper.vm.lat).toBe(1)
    expect(wrapper.vm.lng).toBe(2)
    expect(wrapper.vm.formatted_address).toBe(endereco)

  })
})
