import React from 'react';

import Card from '../../shared/components/card/card';
import Button from '../../shared/components/button/button';
import TextField from '../../shared/components/text-field/text-field';

import "./login.sass";

interface ILoginState {
  email: string;
  password: string;
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(value: string): void {
    this.setState({ email: value });
  }

  handlePasswordChange(value: string): void {
    this.setState({ password: value });
  }

  submit(): void {
    // TODO: Dispatch Login Action
  }

  render(): JSX.Element {
    return (
      <div className="login-container">
        <Card className="login-card">
          <h1 className="title">LOGIN</h1>
          <TextField className="email-field" onChange={this.handleEmailChange} value={this.state.email} label="Email" />
          <TextField className="password-field" onChange={this.handlePasswordChange} value={this.state.password} label="Hasło" />
          <Button width="max" label="LOGIN" onClick={this.submit} />
        </Card>
      </div>
    );
  }
}

export default Login;
