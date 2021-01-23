import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  icon: {
    color: '#cccccc',
    fontSize: 18,
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
});

const InputIcon = forwardRef(
  ({ iconType, iconName, inputStyle, onChangeText, removeTag, showBtn, ...props }, ref) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const handleText = text => {
      setValue(text);
      onChangeText(text);
    };

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current.blur();
      },
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <View style={styles.wrapper}>
        <Icon style={styles.icon} name={iconName} type={iconType} />
        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={text => handleText(text)}
          {...props}
        />
        {showBtn && (
          <TouchableOpacity
            onPress={() => {
              handleText('');
              removeTag();
            }}
          >
            <Icon
              style={[styles.icon, { color: colors.darkGray }]}
              name="x-circle"
              type="Feather"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

InputIcon.defaultProps = {
  iconType: 'Feather',
};

export default InputIcon;
