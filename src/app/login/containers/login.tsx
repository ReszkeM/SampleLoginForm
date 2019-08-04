import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { loginProcess } from '../actions/thunk-actions';
import { LoginState } from '../reducers/reducer';

import LoginData from '../models/login-data';
import Card from '../../shared/components/card/card';
import Button from '../../shared/components/button/button';
import Spinner from '../../shared/components/spinner/spinner';
import TextField from '../../shared/components/text-field/text-field';
import { ValidationError } from '../../shared/interfaces/Validation';
import isEmail from '../../shared/utils/validators/is-email';
import { isValidPassword, isValidPasswordLength } from '../../shared/utils/validators/is-valid-password';
import { AppState } from '../../../rootReducer';

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

interface ILoginProps extends LoginState {
  loginProcess: (loginData: LoginData) => void;
  history: History;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
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

  componentDidUpdate(): void {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  handleEmailChange(value: string): void {
    this.setState({ email: value }, () => this.validateForm());
  }

  handlePasswordChange(value: string): void {
    this.setState({ password: value }, () => this.validateForm());
  }

  submit(): void {
    this.setState({ isValidationEnabled: true }, () => this.validateForm(() => this.handleSubmit()));
  }

  render(): JSX.Element {
    return (
      <>
        <div className="login-container">
          <Card className="login-card">
            <h1 className="title">LOGIN</h1>
            {this.props.errorMessage && this.renderErrorMessage()}
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
        {this.props.isLoging && <Spinner />}
      </>
    );
  }

  private renderErrorMessage(): JSX.Element {
    return (
      <div className="login-error">
        <h3 className="error-message">{this.props.errorMessage}</h3>
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

    this.props.loginProcess(new LoginData(this.state.email, this.state.password));
  }
}

const mapStateToProps = (state: AppState) => ({ ...state.loginReducer });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loginProcess: (loginData: LoginData) => dispatch(loginProcess(loginData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
