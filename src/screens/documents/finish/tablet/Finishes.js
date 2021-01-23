import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform } from 'react-native';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import { Textarea, Button, Text, Title } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import DocOverview from '../../common/DocOverview';
import useFinishesResultReducer from '../useFinishesResultReducer';
import FinishesResult from '../FinishesResult';
import useModal from '../../../../utils/useModal';

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
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    bottom: 10,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});

const getSelected = selected => Object.keys(selected).filter(k => selected[k]);

const Finishes = ({ docUserView, ketThucNhieuVBDen, onClose, resetDocuments }) => {
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
      <View
        style={{
          justifyContent: 'center',
          marginVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
          marginHorizontal: 15,
        }}
      >
        <Title style={styles.title}>Kết thúc nhiều văn bản</Title>
      </View>
      <ScrollView>
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
      </ScrollView>

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
        onClose={async () => {
          await closeModalResult();
          if (DeviceInfo.isTablet()) {
            await onClose();
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }
        }}
        docUserView={getSelected(docUserView)}
      />
    </>
  );
};

Finishes.propTypes = {
  docUserView: PropTypes.shape({}),
  ketThucNhieuVBDen: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

Finishes.defaultProps = {
  docUserView: [],
  onClose() {},
};

export default Finishes;
