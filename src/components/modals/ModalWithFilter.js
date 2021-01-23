import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, Item, Text } from 'native-base';

import variables from 'eoffice/native-base-theme/variables/commonColor';
import colors from 'eoffice/utils/colors';
import BottomModal from './BottomModal';

const styles = StyleSheet.create({
  wrapper: {
    height: variables.deviceHeight - 150,
  },
  halfWrapper: {
    height: variables.deviceHeight / 2,
  },
  item: {
    borderColor: colors.lightBlue,
  },
  searchIcon: {
    fontSize: 24,
    color: colors.blue,
  },
  input: {
    height: 40,
    fontSize: 15,
    paddingLeft: 0,
    color: colors.darkGray,
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  btn: {
    borderRadius: 4,
    marginHorizontal: 100,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ModalWithFilter = ({ children, ExtraActions, isVisible, onClose, onSearch, onSubmit }) => {
  const [keyboardOpened, setKeyboardOpened] = useState(false);
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <BottomModal
      isVisible={isVisible}
      onClose={onClose}
      wrapperStyle={keyboardOpened ? styles.halfWrapper : styles.wrapper}
    >
      <Item rounded style={styles.item}>
        <Icon name="search" style={styles.searchIcon} />
        <Input
          onChangeText={onSearch}
          placeholder="Nhập từ khoá"
          placeholderTextColor={colors.gray}
          returnKeyType="search"
          style={styles.input}
        />
      </Item>

      <View style={styles.contentWrapper}>{children}</View>

      {ExtraActions}
      <Button block style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText} uppercase={false}>
          Đồng ý
        </Text>
      </Button>
    </BottomModal>
  );
};

ModalWithFilter.propTypes = {
  children: PropTypes.node.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,

  ExtraActions: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
ModalWithFilter.defaultProps = {
  ExtraActions: null,
  isVisible: false,
  onClose() { },
};

export default ModalWithFilter;
