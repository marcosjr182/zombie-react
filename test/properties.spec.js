import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Properties from '../src/components/properties';

let wrapper,
    properties;

describe('Test suite for Properties component', () => {
  beforeEach(() => {
    properties = { Water: 5, Food: 4, Ammunition: 3, Medication: 2 };
    wrapper = shallow(<Properties {...properties} />);
  });

  it('Properties should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the survivors properties', () => {

  });
})
