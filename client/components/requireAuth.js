import React from 'react';
import {graphql} from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import {hashHistory} from 'react-router';

export default (WrappedComponent) => {
class RequireAuth extends React.Component {
  componentWillUpdate(nextProps) {
      if(!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push('/login');
      }
  }
  render() {
    console.log('here');
    return <WrappedComponent {...this.props} />;
  }
}

 return graphql(CurrentUserQuery)(RequireAuth);
};
