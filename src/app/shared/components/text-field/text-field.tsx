import React, { Component } from 'react';

import './text-field.sass';

interface ITextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled: boolean;
}

export default class TextField extends Component<ITextFieldProps, {}> {
  static defaultProps = {
    placeholder: '',
    disabled: false
  };

  constructor(props: ITextFieldProps) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  get className(): string {
    return ['form-container', this.props.className].filter(Boolean).join(' ');
  }

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render(): JSX.Element {
    const { label, value, placeholder, disabled } = this.props;

    return (
      <div className={this.className}>
        {label && <label className="form-label">{label}</label>}
        <input
          className="form-control"
          onChange={this.handleOnChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }
}
