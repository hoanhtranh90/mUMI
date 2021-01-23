/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Form, Input, Textarea } from 'native-base';
import colors from 'eoffice/utils/colors';
import styles from './CommandForm.style';
import IconField from '../../common/IconField';

const UpdateForm = ({ state, setValue, hcCaseCommand }) => {
  const fillDataForm = () => {
    setValue('directionContent', hcCaseCommand.directionContent);
    setValue('note', hcCaseCommand.note);
  };

  useEffect(() => {
    fillDataForm();
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="Nội dung chỉ đạo" iconName="info">
            <Textarea
              rowSpan={4}
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={state.directionContent}
              style={styles.textarea}
              onChangeText={txt => setValue('directionContent', txt)}
            />
          </IconField>
          <IconField label="Ghi chú" iconName="info">
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={state.note}
              style={styles.input}
              onChangeText={txt => setValue('note', txt)}
            />
          </IconField>
        </Form>
      </View>
    </ScrollView>
  );
};

UpdateForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  hcCaseCommand: PropTypes.shape({}),
};
UpdateForm.defaultProps = {
  setValue() {},
  state: {},
  hcCaseCommand: {},
};
export default UpdateForm;
