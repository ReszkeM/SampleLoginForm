import React from 'react';
import { create, ReactTestInstance } from 'react-test-renderer';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('it renders', () => {
    const component = create(<Spinner />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    const defaultClassName = 'spinner-container';

    describe('className', () => {
      it('set primary theme by default', () => {
        const component = create(<Spinner />);
        const spinner = component.root.findByType('div') as ReactTestInstance;
        expect(spinner.props.className).toEqual(defaultClassName);
      });

      it('add custom class', () => {
        const customClassName = 'custom-class';
        const expectedClassName = `${defaultClassName} ${customClassName}`;
        const component = create(<Spinner className={customClassName} />);
        const spinner = component.root.findByType('div') as ReactTestInstance;
        expect(spinner.props.className).toEqual(expectedClassName);
      });
    });
  });
});
