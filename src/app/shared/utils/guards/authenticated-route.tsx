import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router';

import { AppState } from '../../../../rootReducer';

// Need to use any instead of interface with `isLoggedIn` property because of `component` type errors
export class AuthenticatedRoute<T extends RouteProps = RouteProps> extends React.Component<any & T, any> {
  render(): JSX.Element {
    const { component: Component, isLoggedIn, ...rest } = this.props;

    const routeComponent = (props: any) =>
      isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />;

    return <Route {...rest} render={routeComponent} />;
  }
}

const mapStateToProps = (state: AppState) => ({ isLoggedIn: state.loginReducer.isLoggedIn });

export default connect(mapStateToProps)(AuthenticatedRoute);
