import React from 'react';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import TextField from './text-field';
import { shouldThrow } from '../../utils/test-helpers/test-helpers';
import { ValidationError } from '../../interfaces/Validation';

describe('TextField', () => {
  const fakeFunc = sinon.spy();
  const testValue = 'some value';

  beforeEach(() => {
    fakeFunc.resetHistory();
  });

  it('it renders', () => {
    const component = create(<TextField value={testValue} onChange={fakeFunc} />);
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('calculate proper container className', () => {
    const defaultClassName = 'form-container';

    describe('customClass', () => {
      it('set `form-container` class by default', () => {
        const component = create(<TextField value={testValue} onChange={fakeFunc} />);
        const container = component.root.findByType('div');
        expect(container.props.className).toEqual(defaultClassName);
      });

      it('add custom class theme', () => {
        const customClassName = 'custom-class';
        const expectedClassName = `${defaultClassName} ${customClassName}`;
        const component = create(<TextField value={testValue} onChange={fakeFunc} className={customClassName} />);
        const container = component.root.findByType('div');
        expect(container.props.className).toEqual(expectedClassName);
      });
    });

    describe('errorMessage', () => {
      it('set `form-container` class by default', () => {
        const component = create(<TextField value={testValue} onChange={fakeFunc} />);
        const container = component.root.findByType('div');
        expect(container.props.className).toEqual(defaultClassName);
      });

      it('add custom class theme', () => {
        const error = new ValidationError('some error');
        const expectedClassName = `${defaultClassName} form-error error`;
        const component = create(<TextField value={testValue} onChange={fakeFunc} errorMessage={error} />);
        const container = component.root.findByType('div');
        expect(container.props.className).toEqual(expectedClassName);
      });
    });
  });

  describe('label', () => {
    it('hidde label by default', () => {
      const component = create(<TextField value={testValue} onChange={fakeFunc} />);
      expect(shouldThrow(() => component.root.findByProps({ className: 'form-label' }))).toBeTruthy();
    });

    it('show label passed in props', () => {
      const expectedText = 'some label';
      const component = create(<TextField value={testValue} onChange={fakeFunc} label={expectedText} />);
      const label = component.root.findByProps({ className: 'form-label' });
      expect(label).toBeTruthy();
      expect(label.props.children).toEqual(expectedText);
    });
  });

  describe('errorMessage', () => {
    it('hidde errorMessage by default', () => {
      const component = create(<TextField value={testValue} onChange={fakeFunc} />);
      expect(shouldThrow(() => component.root.findByProps({ className: 'form-validation' }))).toBeTruthy();
    });

    it('show errorMessage passed in props', () => {
      const error = new ValidationError('some error');
      const component = create(<TextField value={testValue} onChange={fakeFunc} errorMessage={error} />);
      const errorLabel = component.root.findByProps({ className: 'form-validation' });
      expect(errorLabel).toBeTruthy();
      expect(errorLabel.props.children).toEqual(error.message);
    });
  });

  describe('placeholder', () => {
    it('hidde placeholder by default', () => {
      const component = create(<TextField value={testValue} onChange={fakeFunc} />);
      const input = component.root.findByType('input');
      expect(input.props.placeholder).toEqual('');
    });

    it('show placeholder passed in props', () => {
      const expectedText = 'some placeholder';
      const component = create(<TextField value={testValue} onChange={fakeFunc} placeholder={expectedText} />);
      const input = component.root.findByType('input');
      expect(input.props.placeholder).toEqual(expectedText);
    });
  });

  describe('disabled', () => {
    it('its enabled', () => {
      const component = create(<TextField value={testValue} onChange={fakeFunc} />);
      const input = component.root.findByType('input');
      expect(input.props.disabled).toBeFalsy();
    });

    it('its disabled', () => {
      const component = create(<TextField value={testValue} onChange={fakeFunc} disabled={true} />);
      const input = component.root.findByType('input');
      expect(input.props.disabled).toBeTruthy();
    });
  });

  describe('functions tests', () => {
    it('handleSubmit', () => {
      const expectedValue = 'lorem ipsum';
      const component = create(<TextField value={testValue} onChange={fakeFunc} />);
      const instance = (component.getInstance() as any) as TextField;

      instance.handleOnChange({ target: { value: expectedValue } } as React.ChangeEvent<HTMLInputElement>);
      expect(fakeFunc.calledOnceWith(expectedValue)).toBeTruthy();
    });
  });

  describe('UI tests', () => {
    describe('onChange', () => {
      it('calls function', () => {
        const expectedValue = 'lorem ipsum';
        const component = create(<TextField value={testValue} onChange={fakeFunc} />);
        component.root.findByType('input').props.onChange({ target: { value: expectedValue } });

        expect(fakeFunc.calledOnceWith(expectedValue)).toBeTruthy();
      });
    });
  });
});
