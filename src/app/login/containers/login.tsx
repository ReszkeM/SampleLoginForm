import React from 'react';

import Card from '../../shared/components/card/card';
import Button from '../../shared/components/button/button';
import TextField from '../../shared/components/text-field/text-field';
import { ValidationError } from '../../shared/interfaces/Validation';
import isEmail from '../../shared/utils/validators/is-email';
import { isValidPassword, isValidPasswordLength } from '../../shared/utils/validators/is-valid-password';

import './login.sass';

interface IValidations {
  email: ValidationError | null;
  password: ValidationError | null;
}

interface ILoginState {
  isValidationEnabled: boolean;
  email: string;
  password: string;
  errors: IValidations;
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isValidationEnabled: false,
      email: '',
      password: '',
      errors: {
        email: null,
        password: null
      }
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleEmailChange(value: string): void {
    this.setState({ email: value }, () => this.validateForm());
  }

  handlePasswordChange(value: string): void {
    this.setState({ password: value }, () => this.validateForm());
  }

  submit(): void {
    this.setState({ isValidationEnabled: true }, () => this.validateForm(() => this.handleSubmit));
  }

  render(): JSX.Element {
    return (
      <div className="login-container">
        <Card className="login-card">
          <h1 className="title">LOGIN</h1>
          <TextField
            className="email-field"
            onChange={this.handleEmailChange}
            value={this.state.email}
            errorMessage={this.state.errors.email}
            label="Email"
          />
          <TextField
            className="password-field"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            errorMessage={this.state.errors.password}
            type="password"
            label="Hasło"
          />
          <Button width="max" label="LOGIN" onClick={this.submit} />
        </Card>
      </div>
    );
  }

  private validateForm(callback?: () => void): void {
    if (!this.state.isValidationEnabled) {
      return;
    }

    const errors: IValidations = {
      email: null,
      password: null
    };

    if (!this.state.email) {
      errors.email = new ValidationError('Email field is empty.');
    } else if (!isEmail(this.state.email)) {
      errors.email = new ValidationError('Email has invalid format.');
    }

    if (!this.state.password) {
      errors.password = new ValidationError('Password field is empty');
    } else if (!isValidPasswordLength(this.state.password)) {
      errors.password = new ValidationError('Password cannot be shorter than 6 characters.');
    } else if (!isValidPassword(this.state.password)) {
      errors.password = new ValidationError(
        'Password must contains one capital letter, one lower case letter and one number.'
      );
    }

    this.setState({ errors }, callback);
  }

  private handleSubmit(): void {
    if (!!this.state.errors.email || !!this.state.errors.password) {
      return;
    }

    // TODO: Dispatch Login Action
  }
}

export default Login;
