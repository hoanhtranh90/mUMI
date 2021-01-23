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
    paddingLeft: 60,
    height: 40,
    backgroundColor: '#007aff',
    borderRadius: 0,
  },
  btnTabSideBarWhite: {
    paddingLeft: 60,
    height: 40,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newWrapperWhite: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
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

const SubStatRow = ({ count, icon, onPress, label, widthBar, typeOfActive, typeOfBtn }) => {
  return (
    <Button
      iconLeft
      style={typeOfActive !== typeOfBtn ? styles.btnTabSideBarWhite : styles.btnTabSideBarBlue}
      onPress={onPress}
    >
      {widthBar === 203 && (
        <Text
          style={typeOfActive !== typeOfBtn ? styles.txtTabSideBarBlack : styles.txtTabSideBarWhite}
        >
          {label}
        </Text>
      )}
      <Right style={{ paddingRight: 8 }}>
        {count !== null && (
          <View
            style={typeOfActive !== typeOfBtn ? styles.newWrapperGreen : styles.newWrapperWhite}
          >
            <Text style={typeOfActive !== typeOfBtn ? styles.newGreen : styles.newWhite}>
              {count}
            </Text>
          </View>
        )}
      </Right>
    </Button>
  );
};

SubStatRow.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  widthBar: PropTypes.number,
  typeOfActive: PropTypes.number,
  typeOfBtn: PropTypes.number,
};
SubStatRow.defaultProps = {
  count: null,
  widthBar: 0,
  typeOfActive: 1,
  typeOfBtn: 0,
};

export default SubStatRow;
