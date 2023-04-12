import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InfoOutlined } from '@mui/icons-material';

const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <InfoOutlined sx={{ marginRight: '16px' }}/> {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
