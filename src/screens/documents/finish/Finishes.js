import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform } from 'react-native';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import { Textarea, Button, Text } from 'native-base';
import DocOverview from '../common/DocOverview';
import useFinishesResultReducer from './useFinishesResultReducer';
import FinishesResult from './FinishesResult';
import useModal from '../../../utils/useModal';

const styles = StyleSheet.create({
  button: {
    borderColor: '#dcdce6',
    paddingLeft: 26,
    paddingRight: 26,
    height: 36,
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 73,
  },
  btnText: {
    ...Platform.select({
      ios: { fontSize: 17 },
      android: { fontSize: 16 },
    }),
  },
  text: { fontSize: 15, fontWeight: '600' },
  viewButton: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: variables.isIphoneX ? 58 : 24,
  },
});

const getSelected = selected => Object.keys(selected).filter(k => selected[k]);

const Finishes = ({ docUserView, ketThucNhieuVBDen }) => {
  const [note, setNote] = useState('');
  const [visibleModalResult, openModalResult, closeModalResult] = useModal(false);
  const [docStatus, docActions] = useFinishesResultReducer();
  const submit = async () => {
    await Promise.all(
      Object.keys(docUserView).map(async doc => {
        docActions.addStatus(doc, 'docFinish');
        const result = await ketThucNhieuVBDen({
          note,
          doc: JSON.parse(doc),
        });
        if (result) {
          docActions.addStatus(doc, 'docFinished');
        }
      })
    );
    Keyboard.dismiss();
    openModalResult();
  };
  return (
    <>
      {getSelected(docUserView).map(document => (
        <DocOverview
          key={JSON.parse(document).vbDocUserVbDocProcessId}
          document={JSON.parse(document)}
          isForwards
        />
      ))}
      <View style={{ marginTop: 10 }}>
        <IconField label="Ghi chú" iconName="edit" highlight={false}>
          <Textarea
            numberOfLines={4}
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={note}
            onChangeText={setNote}
          />
        </IconField>
      </View>

      <View style={styles.viewButton}>
        <Button block onPress={submit}>
          <Text style={styles.btnText} uppercase={false}>
            Đồng ý
          </Text>
        </Button>
      </View>
      <FinishesResult
        state={docStatus}
        isVisible={visibleModalResult}
        onClose={closeModalResult}
        docUserView={getSelected(docUserView)}
      />
    </>
  );
};

Finishes.propTypes = {
  docUserView: PropTypes.shape({}),
  ketThucNhieuVBDen: PropTypes.func.isRequired,
};

Finishes.defaultProps = {
  docUserView: [],
};

export default Finishes;
