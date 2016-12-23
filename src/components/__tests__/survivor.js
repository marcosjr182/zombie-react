import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Survivor from '../survivor';

const survivor = {
  name: 'Test',
  age: '10',
  gender: 'M'
}

const wrapper = shallow(<Survivor {...survivor} />);

describe('Test suite for Survivor', () => {
  it('Suvivor should render info correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
