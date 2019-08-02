import React, { Component } from 'react';

import './button.sass';

interface IButtonProps {
  onClick: () => void;
  theme: 'primary' | 'secondary';
  style: 'filled' | 'outline';
  width: 'auto' | 'max';
  className?: string;
  label?: string;
  disabled: boolean;
}

export default class Button extends Component<IButtonProps, {}> {
  static defaultProps = {
    theme: 'primary',
    style: 'filled',
    width: 'auto',
    disabled: false
  };

  get className(): string {
    const themeClass = `button-${this.props.theme}`;
    const styleClass = `button-${this.props.style}`;
    const widthClass = `button-${this.props.width}-width`;

    return ['button', themeClass, styleClass, widthClass, this.props.className].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    const { onClick, label, disabled } = this.props;

    return (
      <button onClick={onClick} className={this.className} disabled={disabled}>
        {label}
      </button>
    );
  }
}
