import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text, Textarea, View } from 'native-base';

import BottomModal from 'eoffice/components/modals/BottomModal';
import ModalTitle from 'eoffice/components/modals/ModalTitle';
import Fsb from 'eoffice/components/Fsb';
import IconField from 'eoffice/components/IconField';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import { ScrollView } from 'react-native-gesture-handler';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import NavigationService from 'eoffice/utils/NavigationService';
import ThuHoiProcessSelect from './ThuHoiProcessSelect';

const actionStyles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    marginHorizontal: 80,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnHuy: { textAlign: 'right', marginTop: 20, borderRadius: 4, marginRight: 80 },
});

const ThuHoi = ({ canThuHoiProcess, mode, thuHoi, vbProcess }) => {
  const [isVisible, open, close] = useModal();
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState([]);

  const submit = async () => {
    const result = await thuHoi({ note, processes: selected });
    if (result) {
      close();
      NavigationService.goBack();
    }
  };
  let modeStatus = null
  if (global.hasDeeplink) {
    modeStatus = global.typeDocDetail
  } else {
    modeStatus = mode
  }
  const submitDisabled =
    !note || (canThuHoiProcess && modeStatus === DOCUMENT_TYPE.VB_DEN && selected.length === 0);

  return (
    <>
      {vbProcess && (
        <Fsb
          text="Thu hồi"
          icon={<Icon name="slash" type="Feather" style={{ color: colors.red }} />}
          onPress={open}
          borderColor={colors.lightRed}
        />
      )}
      <BottomModal isVisible={isVisible} onClose={close}>
        <ScrollView>
          <ModalTitle title="Thu hồi văn bản" />
          {canThuHoiProcess && modeStatus === DOCUMENT_TYPE.VB_DEN && (
            <ThuHoiProcessSelect
              processId={vbProcess.id}
              onChange={setSelected}
              selectedValues={selected}
            />
          )}
          <IconField
            label="Nhập lý do thu hồi"
            iconName="edit"
            highlight={!!note}
            required
            wrapperStyle={{ paddingRight: 0 }}
          >
            <Textarea
              numberOfLines={4}
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={note}
              onChangeText={setNote}
            />
          </IconField>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button block style={actionStyles.btn} onPress={submit} disabled={submitDisabled}>
              <Text style={actionStyles.btnText} uppercase={false}>
                Đồng ý
              </Text>
            </Button>
            <Button style={actionStyles.btnHuy} bordered danger onPress={close}>
              <Text style={actionStyles.btnText}>Hủy</Text>
            </Button>
          </View>
        </ScrollView>
      </BottomModal>
    </>
  );
};

ThuHoi.propTypes = {
  thuHoi: PropTypes.func.isRequired,

  canThuHoiProcess: PropTypes.bool,
  mode: PropTypes.number,
  vbProcess: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
ThuHoi.defaultProps = {
  canThuHoiProcess: false,
  mode: DOCUMENT_TYPE.VB_DEN,
  vbProcess: null,
};

export default ThuHoi;
