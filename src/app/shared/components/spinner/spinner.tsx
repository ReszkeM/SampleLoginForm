import React, { Component } from 'react';

import './spinner.sass';

export interface ISpinnerProps {
  className?: string;
}

export class Spinner extends Component<ISpinnerProps, {}> {
  get className(): string {
    return ['spinner-container', this.props.className].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    return (
      <div className={this.className}>
        <div className="loader">Loading...</div>
      </div>
    );
  }
}

export default Spinner;
