import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Stats from '../my-stats';

const survivor = {
  name: 'TestName',
  items: {
    Water: 2,
    Food: 1,
    Ammunition: 4,
    Medication: 3
  }
}

const wrapper = shallow(<Stats user={survivor} />);

describe('Report component', () => {
  it('should render info correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
