import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Survivor from '../survivor';

const survivor = {
  name: 'Test',
  age: '10',
  gender: 'M'
}

describe('Test suite for Survivor', () => {
  it('Suvivor should render info correctly', () => {
    const wrapper = shallow(<Survivor {...{ ...survivor, distance: '10' }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('should not break if it does not receive a distance', () => {
    const survivor = {...survivor, gender: 'F' }
    const wrapper = shallow(<Survivor {...survivor} />)
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
