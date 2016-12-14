import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import { expect } from 'chai';

import Properties from '../src/components/properties';

let wrapper,
    properties;

describe('Test suite for Properties component', () => {
  beforeEach(() => {
    axios.get(`../properties.json`)
      .then((res) => {
        properties = res.data;
        wrapper = mount(<Properties {...properties} />);
      })
  });

  it('Properties should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays the survivors properties', () => {
    const itemList = wrapper.childAt(0);

    expect(itemList.children().length()).to.equal(4);
    expect(itemList.childAt(0).childAt(0).text()).to.equal('WATER');
    expect(itemList.childAt(0).childAt(1).text()).to.equal(properties.Water);
    expect(itemList.childAt(1).childAt(0).text()).to.equal('FOOD');
    expect(itemList.childAt(1).childAt(1).text()).to.equal(properties.Food);
    expect(itemList.childAt(2).childAt(0).text()).to.equal('AMMUNITION');
    expect(itemList.childAt(2).childAt(1).text()).to.equal(properties.Ammunition);
    expect(itemList.childAt(3).childAt(0).text()).to.equal('MEDICATION');
    expect(itemList.childAt(3).childAt(1).text()).to.equal(properties.Medication);
  });
})
