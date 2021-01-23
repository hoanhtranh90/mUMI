import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Item, Input } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  grayBg: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  input: {
    color: colors.darkGray,
    height: 40,
    paddingLeft: 0,
  },
});

const SearchHeader = ({ navigation, updateQuery }) => {
  const [keyword, setKeyword] = useState('');

  return (
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={styles.grayBg}
          onPress={() => navigation.goBack()}
        />
      }
      Content={
        <Item rounded style={styles.grayBg}>
          <Icon name="search" type="Feather" style={{ color: colors.darkGray }} />
          <Input
            placeholder="Mời nhập từ khoá"
            placeholderTextColor={colors.gray}
            returnKeyType="search"
            style={styles.input}
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={() => updateQuery({ keyword, usingAdvanceSearch: 0 })}
          />
        </Item>
      }
      rightStyle={styles.right}
      leftStyle={styles.left}
      contentStyle={styles.body}
      hasBorder
    />
  );
};
SearchHeader.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

export default SearchHeader;
