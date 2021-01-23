import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import useModal from '../../../../utils/useModal';
import SingleHandlerSelectModal from './SingleHandlerSelectModal';
import colors from '../../../../utils/colors';

const styles = StyleSheet.create({
  btn: { alignSelf: 'stretch', height: 20, paddingTop: 0, paddingBottom: 0 },
  placeholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    color: colors.darkGray,
    paddingLeft: 0,
    paddingRight: 0,
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

const HandlerSelectField = ({ disabled, handlers, onChange, placeholder, value }) => {
  const [visible, open, close] = useModal();
  const selectedHandler = _.find(handlers, handler => handler.id === value);

  return (
    <>
      <Button onPress={open} transparent disabled={disabled} style={styles.btn}>
        <Text uppercase={false} style={value ? styles.text : styles.placeholder}>
          {selectedHandler?.fullName || placeholder}
        </Text>
      </Button>
      <SingleHandlerSelectModal
        isVisible={visible}
        onClose={close}
        handlers={handlers}
        onSubmit={onChange}
      />
    </>
  );
};

HandlerSelectField.propTypes = {
  handlers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
HandlerSelectField.defaultProps = {
  disabled: false,
  onChange() {},
  placeholder: '',
  value: undefined,
};

export default HandlerSelectField;
