/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import Enzyme, {
  render, configure, simulate, mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from '../js/store';
import DishComponent from './DishComponent';

configure({ adapter: new Adapter() });

describe('Testing customer Landing Component', () => {
  let wrapper;
  beforeEach(() => {
    const location = {};
    const match = { params: ' ' };
    wrapper = render(<Provider store={store}><DishComponent location={location} match={match} /></Provider>);
  });

  test('Renders Heading with text', () => {
    expect(wrapper.find('#quantity').text()).toContain('1');
  });
  //   test('Renders the click event to increment quantity', () => {
  //     wrapper.find('#increment').simulate('click');
  //     const location = {};
  //     const match = { params: ' ' };
  //     const wrap = shallow(<Provider store={store}><DishComponent location={location} match={match} /></Provider>);

//     wrap.find('#incrementQty').simulate('click');
//     expect(wrap.find('#quantity').text()).toContain('2');
//   });
});
