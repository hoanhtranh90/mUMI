import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Text, Button, Right, View } from 'native-base';
import colors from '../../../../utils/colors';

const styles = StyleSheet.create({
  iconSideBarWhite: {
    fontSize: 23,
    color: '#ffffff',
    paddingRight: 8,
    paddingVertical: 3,
  },
  iconSideBarBlack: {
    fontSize: 23,
    color: '#c9c7c6',
    paddingRight: 8,
    paddingVertical: 3,
  },
  btnTabSideBarBlue: {
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 0,
  },
  btnTabSideBarWhite: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 0,
  },
  txtTabSideBarBlack: {
    color: '#2b2d50',
    fontSize: 15,
    paddingLeft: 8,
  },
  txtTabSideBarWhite: {
    color: '#ffffff',
    fontSize: 15,
    paddingLeft: 8,
  },
  newWrapperGreen: {
    backgroundColor: colors.lightGreen,
    paddingRight: 3,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
    width: 50,
  },
  newWrapperWhite: {
    backgroundColor: 'white',
    paddingRight: 3,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
    width: 50,
  },
  newGreen: {
    fontSize: 12,
    color: colors.green,
    textAlign: 'center',
  },
  newWhite: {
    fontSize: 12,
    color: '#007aff',
    textAlign: 'center',
  },
});

const StatRow = ({ count, icon, relationType, type, value, filterStatus, onPress, label, widthBar, typeOfActive, typeOfBtn, index }) => (
  <Button
    iconLeft
    style={typeOfActive !== typeOfBtn ? styles.btnTabSideBarWhite : styles.btnTabSideBarBlue}
    onPress={() => {
      onPress(value, relationType, type, filterStatus, index);
    }}
  >
    <Icon
      name={icon}
      type="Feather"
      style={typeOfActive !== typeOfBtn ? styles.iconSideBarBlack : styles.iconSideBarWhite}
    />
    {widthBar === 203 && (
      <Text
        style={typeOfActive !== typeOfBtn ? styles.txtTabSideBarBlack : styles.txtTabSideBarWhite}
      >
        {label}
      </Text>
    )}
    <Right style={{ paddingRight: 8 }}>
      {count !== null && (
        <View style={typeOfActive !== typeOfBtn ? styles.newWrapperGreen : styles.newWrapperWhite}>
          <Text style={typeOfActive !== typeOfBtn ? styles.newGreen : styles.newWhite}>
            {count}
          </Text>
        </View>
      )}
    </Right>
  </Button>
);

StatRow.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  widthBar: PropTypes.number,
  typeOfActive: PropTypes.number,
  typeOfBtn: PropTypes.number,
};
StatRow.defaultProps = {
  count: null,
  widthBar: 0,
  typeOfActive: 1,
  typeOfBtn: 0,
};

export default StatRow;
