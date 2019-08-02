import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import Button from './button';

describe('Button', () => {
  const fakeFunc = sinon.spy();
  const defaultClassName = 'button button-primary button-filled button-auto-width';

  it('it renders', () => {
    const component = create(<Button onClick={fakeFunc} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper className', () => {
    describe('className', () => {
      it('set `btn btn-primary` class by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('add custom class', () => {
        const customClassName = 'custom-class';
        const expectedClassName = `${defaultClassName} ${customClassName}`;
        const component = create(<Button onClick={fakeFunc} className={customClassName} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });

    describe('theme', () => {
      it('set primary theme by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('set choosen theme', () => {
        const expectedClassName = 'button button-secondary button-filled button-auto-width';
        const component = create(<Button onClick={fakeFunc} theme="secondary" />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });

    describe('style', () => {
      it('set primary filled by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('set choosen style', () => {
        const expectedClassName = 'button button-primary button-outline button-auto-width';
        const component = create(<Button onClick={fakeFunc} style="outline" />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });

    describe('width', () => {
      it('set auto width by default', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(defaultClassName);
      });

      it('set choosen width', () => {
        const expectedClassName = 'button button-primary button-filled button-max-width';
        const component = create(<Button onClick={fakeFunc} width="max" />);
        const button = component.root.findByType('button');
        expect(button.props.className).toEqual(expectedClassName);
      });
    });
  });

  describe('label', () => {
    it('hide label by default', () => {
      const component = create(<Button onClick={fakeFunc} />);
      const button = component.root.findByType('button');
      expect(button.props.children).toBeUndefined();
    });

    it('show label passed in props', () => {
      const expectedText = 'some label';
      const component = create(<Button onClick={fakeFunc} label={expectedText} />);
      const button = component.root.findByType('button');
      expect(button.props.children).toEqual(expectedText);
    });
  });

  describe('disabled', () => {
    it('its enabled', () => {
      const component = create(<Button onClick={fakeFunc} />);
      const button = component.root.findByType('button');
      expect(button.props.disabled).toBeFalsy();
    });

    it('its disabled', () => {
      const component = create(<Button onClick={fakeFunc} disabled={true} />);
      const button = component.root.findByType('button');
      expect(button.props.disabled).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onClick', () => {
      it('calls function', () => {
        const component = create(<Button onClick={fakeFunc} />);
        const button = component.root.findByType('button');
        button.props.onClick();
        expect(fakeFunc.calledOnce).toBeTruthy();
      });
    });
  });
});
