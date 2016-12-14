import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Survivor from '../src/components/survivor';

let wrapper;

describe('Test suite for Survivor', () => {
  beforeEach(() => {
    wrapper = shallow(<Survivor
                        name={'TestUser'}
                        gender={'M'}
                        age={20} />);
  });

  it('Suvivor should  exist', () => {
    expect(wrapper).to.exist;
  });

  it('Correctly displays his personal information', () => {
    const survivorCard = wrapper.childAt(0).childAt(0),
          name = survivorCard.childAt(0),
          info = survivorCard.childAt(1);

    expect(name.hasClass('name')).to.equal(true);
    expect(name.text()).to.equal('TestUser');
    expect(info.hasClass('info')).to.equal(true);
    expect(info.text()).to.equal('MALE | 20');
  });
})
