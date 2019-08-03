import React, { Component } from 'react';

import { ValidationError } from '../../interfaces/Validation';

import './text-field.sass';

interface ITextFieldProps {
  value: string;
  onChange: (value: string) => void;
  type: 'text' | 'password';
  placeholder?: string;
  className?: string;
  label?: string;
  errorMessage?: ValidationError | null;
  disabled: boolean;
}

export default class TextField extends Component<ITextFieldProps, {}> {
  static defaultProps = {
    placeholder: '',
    type: 'text',
    disabled: false
  };

  constructor(props: ITextFieldProps) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  get containerClassName(): string {
    const errorClass = !!this.props.errorMessage && `form-error ${this.props.errorMessage.type}`;
    return ['form-container', errorClass, this.props.className].filter(Boolean).join(' ');
  }

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render(): JSX.Element {
    const { label, value, placeholder, disabled, errorMessage, type } = this.props;

    return (
      <div className={this.containerClassName}>
        {label && <label className="form-label">{label}</label>}
        <input
          className="form-control"
          onChange={this.handleOnChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
        />
        {errorMessage && <label className="form-validation">{errorMessage.message}</label>}
      </div>
    );
  }
}
