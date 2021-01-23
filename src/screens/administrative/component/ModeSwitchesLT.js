import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.lighterGray,
    borderRadius: 4,
    marginTop: 20,
  },
  separator: {
    width: 1,
    backgroundColor: '#b6bdc6',
    marginVertical: 9,
  },
  btn: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    borderColor: colors.lighterGray,
    elevation: 0,
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(45, 62, 79, 0.5)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  selectedText: {
    color: colors.blue,
  },
});

const ModeSwitchesLT = ({ current, modes, onChange, hcFlow }) => {
  if (modes.length === 1) {
    onChange({ mode: modes[0].value, flow: hcFlow?.flowCode })
  }
  return (
    <View style={styles.container}>
      {modes.map(({ label, value }, index) => (
        <React.Fragment key={value}>
          <Button
            onPress={() => onChange({ mode: value, flow: hcFlow?.flowCode })}
            style={styles.btn}
          >
            <Text
              uppercase={false}
              style={[styles.text, value === current ? styles.selectedText : null]}
            >
              {label}
            </Text>
          </Button>
          {index < modes.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
}

ModeSwitchesLT.propTypes = {
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  modes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  hcFlow: PropTypes.objectOf.isRequired,
};

export default ModeSwitchesLT;
