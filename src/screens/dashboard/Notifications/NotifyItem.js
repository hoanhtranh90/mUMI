import { React } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'native-base';

const NotifyItem = ({ notification }) => (
  <Button>
    <Text>{notification.notificationId}</Text>
  </Button>
);

NotifyItem.propTypes = {
  notification: PropTypes.shape({}).isRequired,
};

export default NotifyItem;
