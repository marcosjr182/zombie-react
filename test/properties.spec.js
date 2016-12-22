import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Properties from '../src/components/properties';
const items = { Water: 5, Food: 4, Ammunition: 3, Medication: 2 }

describe('Test suite for Properties component', () => {
  beforeEach(() => {
    wrapper = shallow(<Properties items={items} columns='3' />);
  });

  it('Properties should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the survivors properties', () => {
    fail()
  });
})
