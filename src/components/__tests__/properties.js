import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Properties from '../properties';

const items = { Water: 5, Food: 4, Ammunition: 3, Medication: 2 },
      wrapper = shallow(<Properties items={items} columns='3' />);

describe('Properties component', () => {

  it('should render the properties correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render the four types of items', () =>{
    expect(wrapper.find('Property').length).toBe(4);
  })

})
