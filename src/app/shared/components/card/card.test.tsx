import React from 'react';
import { create } from 'react-test-renderer';

import Card from './card';

describe('Card', () => {
  it('it renders', () => {
    const component = create(<Card />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    const defaultClassName = 'card';

    it('set `card` class by default', () => {
      const component = create(<Card />);
      const container = component.root.findByType('div');
      expect(container.props.className).toEqual(defaultClassName);
    });

    it('add custom class theme', () => {
      const customClassName = 'custom-class';
      const expectedClassName = `${defaultClassName} ${customClassName}`;
      const component = create(<Card className={customClassName} />);
      const container = component.root.findByType('div');
      expect(container.props.className).toEqual(expectedClassName);
    });
  });
});
