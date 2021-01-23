import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import useModal from 'eoffice/utils/useModal';

import Fsb from 'eoffice/components/Fsb';
import { DOCUMENT_TYPE, OUTGOING_DOC_STATUS, PROCESS_TYPES } from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';
import KetThuc from './KetThuc.container';
import ChoYKien from './ChoYKien.container';
import ThuHoi from './ThuHoi.container';
import TuChoi from './TuChoi.container';
import CXLModal from '../tablet/CXLModal';
import CCModal from '../tablet/CCModal';
import { STEP_POS_TYPE } from '../../../../../constants/documents';

const DocumentActions = ({
  canCCVanBan,
  canChuyenXuLy,
  canChuyenXuLyDonvi,
  canKetThuc,
  canChoYKien,
  canTuChoi,
  canThuHoi,
  document,
  mode,
  process,
  step,
  resetDocuments,
  isViewAsUyQuyen,
}) => {
  if (mode === DOCUMENT_TYPE.VB_DI && document?.status === OUTGOING_DOC_STATUS.TAO_MOI) {
    return null;
  }
  if (mode === DOCUMENT_TYPE.VB_DEN && step === null) {
    return null;
  }
  let modeStatus = null;
  if (global.hasDeeplink) {
    modeStatus = global.typeDocDetail;
  } else {
    modeStatus = mode;
  }
  const [isVisible, open, close] = useModal();
  const [isCxlDV, setIsCxlDV] = useState(false);
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 16,
        borderBottomWidth: DeviceInfo.isTablet() ? 0 : 1,
        borderBottomColor: colors.lighterGray,
      }}
    >
      {!isViewAsUyQuyen && canCCVanBan && (
        <Fsb
          text="CC"
          icon={<Icon name="share" type="FontAwesome5" style={{ color: colors.blue }} />}
          onPress={() => {
            if (DeviceInfo.isTablet()) {
              open();
            } else {
              NavigationService.navigate('CC');
            }
          }}
          borderColor={colors.lightGreen}
        />
      )}
      {/* {canChuyenXuLyDonvi && !DeviceInfo.isTablet() && (
        <Fsb
          text="Chuyển ĐV"
          borderColor={colors.lightBlue}
          icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
          onPress={() => {
            setIsCxlDV(true);
            if (DeviceInfo.isTablet()) {
              open();
            } else {
              NavigationService.navigate('Forward', { isDept: true });
            }
          }}
        />
      )} */}
      {/* {canChuyenXuLy && mode === DOCUMENT_TYPE.VB_DEN && !DeviceInfo.isTablet() && (
        <Fsb
          text="Chuyển"
          borderColor={colors.lightBlue}
          icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
          onPress={() => {
            setIsCxlDV(false);
            if (DeviceInfo.isTablet()) {
              open();
            } else {
              NavigationService.navigate('Forward');
            }
          }}
        />
      )} */}

      {!isViewAsUyQuyen &&
        (!canChuyenXuLy &&
          modeStatus === DOCUMENT_TYPE.VB_DEN &&
          !canChuyenXuLyDonvi &&
          step &&
          step.posType !== STEP_POS_TYPE.KET_THUC &&
          step.posType !== STEP_POS_TYPE.BOTH) && (
          <Fsb
            text="Chuyển"
            borderColor={colors.lightBlue}
            icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
            onPress={() => {
              setIsCxlDV(false);
              if (DeviceInfo.isTablet()) {
                open();
              } else {
                NavigationService.navigate('Forward');
              }
            }}
          />
        )}

      {!isViewAsUyQuyen &&
        (canChuyenXuLy &&
          modeStatus === DOCUMENT_TYPE.VB_DEN &&
          canChuyenXuLyDonvi &&
          step &&
          step.posType !== STEP_POS_TYPE.KET_THUC &&
          step.posType !== STEP_POS_TYPE.BOTH) && (
          <Fsb
            text="Chuyển"
            borderColor={colors.lightBlue}
            icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
            onPress={() => {
              setIsCxlDV(false);
              if (DeviceInfo.isTablet()) {
                open();
              } else {
                NavigationService.navigate('Forward');
              }
            }}
          />
        )}

      {!isViewAsUyQuyen &&
        (!canChuyenXuLy &&
          modeStatus === DOCUMENT_TYPE.VB_DEN &&
          canChuyenXuLyDonvi &&
          step &&
          step.posType !== STEP_POS_TYPE.KET_THUC &&
          step.posType !== STEP_POS_TYPE.BOTH) && (
          <Fsb
            text="Chuyển"
            borderColor={colors.lightBlue}
            icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
            onPress={() => {
              setIsCxlDV(false);
              if (DeviceInfo.isTablet()) {
                open();
              } else {
                NavigationService.navigate('Forward');
              }
            }}
          />
        )}

      {!isViewAsUyQuyen &&
        (canChuyenXuLy &&
          modeStatus === DOCUMENT_TYPE.VB_DEN &&
          !canChuyenXuLyDonvi &&
          step &&
          step.posType !== STEP_POS_TYPE.KET_THUC &&
          step.posType !== STEP_POS_TYPE.BOTH) && (
          <Fsb
            text="Chuyển"
            borderColor={colors.lightBlue}
            icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
            onPress={() => {
              setIsCxlDV(false);
              if (DeviceInfo.isTablet()) {
                open();
              } else {
                NavigationService.navigate('Forward');
              }
            }}
          />
        )}

      {!isViewAsUyQuyen && (canChuyenXuLy && modeStatus === DOCUMENT_TYPE.VB_DI) && (
        <Fsb
          text="Chuyển"
          borderColor={colors.lightBlue}
          icon={<Icon name="fast-forward" type="Feather" style={{ color: colors.blue }} />}
          onPress={() => {
            setIsCxlDV(false);
            if (DeviceInfo.isTablet()) {
              open();
            } else {
              NavigationService.navigate('Forward');
            }
          }}
        />
      )}
      {!DeviceInfo.isTablet() ? (
        <Fsb
          text="Bình luận"
          borderColor={colors.lightYellow}
          icon={<Icon name="message-square" type="Feather" style={{ color: colors.yellow }} />}
          onPress={() => {
            if (DeviceInfo.isTablet()) {
              return;
            }
            NavigationService.navigate('History', { focusComment: true });
          }}
        />
      ) : null}

      {!isViewAsUyQuyen && canKetThuc && modeStatus === DOCUMENT_TYPE.VB_DEN && (
        <KetThuc
          resetDocuments={resetDocuments}
          mode={mode}
          document={document}
          actionName={
            process?.processType === PROCESS_TYPES.NHAN_DE_BIET.value ? 'Đã nhận' : 'Kết thúc'
          }
          borderColor={colors.lightGreen}
          icon={<Icon name="calendar-check" type="FontAwesome5" style={{ color: colors.green }} />}
        />
      )}
      {!isViewAsUyQuyen && canKetThuc && modeStatus === DOCUMENT_TYPE.VB_DI && (
        <KetThuc
          resetDocuments={resetDocuments}
          mode={mode}
          step={step}
          document={document}
          label={step?.signType === 2 ? 'Ý kiến/đề xuất' : 'Ghi chú'}
          actionName={step?.signType === 2 ? 'Ký duyệt' : 'Kết thúc'}
          borderColor={colors.lightGreen}
          icon={<Icon name="calendar-check" type="FontAwesome5" style={{ color: colors.green }} />}
        />
      )}

      {!isViewAsUyQuyen && canChoYKien && (
        <ChoYKien
          resetDocuments={resetDocuments}
          mode={mode}
          document={document}
          noteRequired
          label={'Nội dung'}
          actionName={'Ý kiến chỉ đạo'}
          borderColor={colors.lightGreen}
          icon={<Icon name="edit" type="FontAwesome5" style={{ color: colors.purple }} />}
        />
      )}

      {!isViewAsUyQuyen && canTuChoi && (
        <TuChoi
          resetDocuments={resetDocuments}
          mode={mode}
          document={document}
          noteRequired
          label="Nhập lý do từ chối"
          actionName="Từ chối"
          borderColor={colors.lightRed}
          icon={<Icon name="x-circle" type="Feather" style={{ color: colors.red }} />}
        />
      )}

      {/* {!isViewAsUyQuyen && (canTuChoi && modeStatus == DOCUMENT_TYPE.VB_DEN) && (
        <TuChoi
          resetDocuments={resetDocuments}
          mode={mode}
          document={document}
          noteRequired
          label="Nhập lý do từ chối"
          actionName="Từ chối"
          borderColor={colors.lightRed}
          icon={<Icon name="x-circle" type="Feather" style={{ color: colors.red }} />}
        />
      )} */}

      {!isViewAsUyQuyen && canThuHoi && (
        <ThuHoi
          resetDocuments={resetDocuments}
          mode={mode}
          document={document}
          actionName="Thu hồi"
          borderColor={colors.lightRed}
          icon={<Icon name="exchange-alt" type="FontAwesome5" style={{ color: colors.red }} />}
        />
      )}
      {DeviceInfo.isTablet() && isCxlDV && (
        <CXLModal
          close={close}
          isVisible={isVisible}
          mode={modeStatus}
          document={document}
          isDept={isCxlDV}
        />
      )}
      {DeviceInfo.isTablet() && !isCxlDV && !canCCVanBan && (
        <CXLModal
          close={close}
          isVisible={isVisible}
          mode={modeStatus}
          document={document}
          isDept={isCxlDV}
        />
      )}
      {canCCVanBan && DeviceInfo.isTablet() && !isCxlDV && (
        <CCModal close={close} isVisible={isVisible} mode={modeStatus} document={document} />
      )}
    </View>
  );
};

DocumentActions.propTypes = {
  canCCVanBan: PropTypes.bool,
  canChuyenXuLy: PropTypes.bool,
  canChuyenXuLyDonvi: PropTypes.bool,
  canKetThuc: PropTypes.bool,
  canTuChoi: PropTypes.bool,
  canThuHoi: PropTypes.bool,
  document: PropTypes.shape({
    status: PropTypes.number,
  }),
  mode: PropTypes.number,
  process: PropTypes.shape({
    processType: PropTypes.number,
  }),
  step: PropTypes.shape({
    signType: PropTypes.number,
  }),
  resetDocuments: PropTypes.func.isRequired,
  // focusCommentInput: PropTypes.func.isRequired
};
DocumentActions.defaultProps = {
  canCCVanBan: true,
  canChuyenXuLy: true,
  canChuyenXuLyDonvi: true,
  canKetThuc: true,
  canChoYKien: true,
  canTuChoi: true,
  canThuHoi: true,
  document: null,
  mode: DOCUMENT_TYPE.VB_DEN,
  process: null,
  step: null,
};

export default DocumentActions;
