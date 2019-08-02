import React, { Component, Children } from 'react';

import './card.sass';

interface ICardProps {
  className?: string;
}

export default class Card extends Component<ICardProps, {}> {
  get className(): string {
    return ['card', this.props.className].filter(Boolean).join(' ');
  }

  render(): JSX.Element {
    return <div className={this.className}>{this.props.children}</div>;
  }
}
