import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import renderer from 'react-test-renderer';

import Properties from '../src/components/properties';

let data = { Water: 5, Food: 4, Ammunition: 3, Medication: 2 }
let wrapper
describe('Test suite for Properties component', () => {

  beforeEach(() => {
    wrapper = shallow(<Properties {...data} />);
  });

  it('Properties should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the survivors properties', () => {

  });
})
