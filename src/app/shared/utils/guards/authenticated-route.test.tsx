import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { create } from 'react-test-renderer';

import { AuthenticatedRoute } from './authenticated-route';
import Home from '../../../home/containers/home';
import { shouldThrow } from '../test-helpers/test-helpers';

describe('AuthenticatedRoute', () => {
  it('it renders', () => {
    const component = create(
      <Router>
        <AuthenticatedRoute component={Home} />
      </Router>
    );
    expect(component).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('it redirects to login page', () => {
    const component = create(
      <Router>
        <AuthenticatedRoute component={Home} isLoggedIn={false} />
      </Router>
    );
    expect(component.root.findByType(Redirect)).toBeTruthy();
    expect(shouldThrow(() => component.root.findByType(Home))).toBeTruthy();
  });

  it('it shows home component', () => {
    const component = create(
      <Router>
        <AuthenticatedRoute component={Home} isLoggedIn={true} />
      </Router>
    );
    expect(shouldThrow(() => component.root.findByType(Redirect))).toBeTruthy();
    expect(component.root.findByType(Home)).toBeTruthy();
  });
});
