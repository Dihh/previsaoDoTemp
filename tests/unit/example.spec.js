import { shallowMount } from '@vue/test-utils'
import mainComponent from '@/components/mainComponent.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(mainComponent, {})
    expect(wrapper.text()).toMatch('');
  })
})
