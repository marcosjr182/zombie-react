import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Properties from '../properties';

const items = { Water: 5, Food: 4, Ammunition: 3, Medication: 2 }
const wrapper = shallow(<Properties items={items} columns='3' />);

describe('Test suite for Properties component', () => {

  it('Correctly renders the properties', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

})
