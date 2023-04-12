import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component,
  auth: { user, loading }
}) => {
  if (loading) return '';
  if (user.role) return <Component />;

  return <Navigate to="/notFound" />;
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
