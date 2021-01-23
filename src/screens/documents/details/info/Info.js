import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Spinner } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import { DOCUMENT_TYPE, OUTGOING_DOC_STATUS, RELATION_TYPE, PROCESS_TYPE_TEXTS } from 'eoffice/constants/documents';
import useDownload from 'eoffice/utils/useDownload';
import { getFields, getValue, getValueByKey } from './utils';

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 15, paddingTop: 20, paddingBottom: 12 },
  fieldWrapper: { paddingBottom: 20 },
  quote: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 16,
  },
  btn: { backgroundColor: colors.blue, borderRadius: 4, height: 64 },
  btnText: { fontSize: 17, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  btnIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    marginHorizontal: 16,
    paddingTop: 0,
  },
  bccWrap: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.yellow,
    backgroundColor: colors.lightYellow,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bccIcon: {
    color: colors.yellow,
    fontSize: 12,
    width: 15,
  },
  bccText: {
    color: colors.yellow,
    fontSize: 12,
  },
  wrapperStatus: {
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 13,
  },
});

const Info = ({ document, mode, deptRole, vbDocUserBcc, bccInfo, isAutoBcc, isAutoBccDuThao, process }) => {
  if (!document) {
    return null;
  }
  let modeStatus = null;
  if (global.hasDeeplink) {
    modeStatus = global.typeDocDetail;
  } else {
    modeStatus = mode;
  }

  const [fields, setFields] = useState([]);

  const [downloadState, startDownload, startDownloadPdf, startDownloadRefere] = useDownload({
    attachmentId: document?.file?.id,
    fileName: document?.file?.fileName,
    open: true,
    documentId:
      (modeStatus === DOCUMENT_TYPE.VB_DI &&
        deptRole?.userId === document?.editorId &&
        document?.status === OUTGOING_DOC_STATUS.TU_CHOI) ||
      (modeStatus === DOCUMENT_TYPE.VB_DI &&
        deptRole?.userId === document?.editorId &&
        document?.status === OUTGOING_DOC_STATUS.TU_CHOI_BANHANH)
        ? null
        : document?.id,
  });

  useEffect(
    () => {
      setFields(getFields(modeStatus, document?.status));
    },
    [document, modeStatus]
  );
  let colorPriority = '';
  let statusColorPriority = '';
  let commandsStatusPriority = '';

  if (document && document.priorityId) {
    if (document.priorityId === '16') {
      colorPriority = 'rgba(57, 202, 116, 0.2)';
      statusColorPriority = '#39ca74';
      commandsStatusPriority = 'Bình thường';
    } else if (document.priorityId === '15') {
      colorPriority = 'rgba(240, 195, 48, 0.2)';
      statusColorPriority = '#f0c330';
      commandsStatusPriority = 'Khẩn';
    } else {
      colorPriority = 'rgba(167,7,7,0.2)';
      statusColorPriority = '#ff0000';
      commandsStatusPriority = 'Thượng khẩn';
    }
  }

  let colorProcessType = '';
  let statusColorProcessType = '';
  let commandsProcessType = '';
  let iconProcessType = 'user'

  if (process) {
    if (process.processType === 0) {
      colorProcessType = 'rgba(167,7,7,0.2)';
      statusColorProcessType = '#ff0000';
    } else if (process.processType === 2) {
      colorProcessType = 'rgba(240, 195, 48, 0.2)';
      statusColorProcessType = '#f0c330';
      iconProcessType = 'users'
    } else if (process.processType === 1){
      colorProcessType = '#d0e7fb';
      statusColorProcessType = '#5CA6FC';
      iconProcessType = 'info'
    }
    commandsProcessType = PROCESS_TYPE_TEXTS[process.processType];
  }
  return (
    <ScrollView scrollEnabled={!DeviceInfo.isTablet()}>
      <View style={styles.wrapper}>
        <Text style={styles.quote}>{document?.quote}</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          {document && document.priorityId && <View style={[styles.wrapperStatus, { backgroundColor: colorPriority }]}>
            <Icon name={'zap'} type="Feather" style={[styles.icon, { color: statusColorPriority }]} />
            <Text style={[styles.status, { color: statusColorPriority, marginLeft: 4 }]}>{commandsStatusPriority}</Text>
          </View>}

          {(process && modeStatus != DOCUMENT_TYPE.VB_DI) && <View style={[styles.wrapperStatus, { backgroundColor: colorProcessType, marginLeft: 10 }]}>
            <Icon name={iconProcessType} type="Feather" style={[styles.icon, { color: statusColorProcessType }]} />
            <Text style={[styles.status, { color: statusColorProcessType, marginLeft: 4  }]}>{commandsProcessType}</Text>
          </View>}
        </View>
        {isAutoBcc && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={styles.bccWrap}>
              <Icon name="warning" type="AntDesign" style={styles.bccIcon} />
              <Text style={styles.bccText}>{isAutoBccDuThao ? 'BCC-DT' : 'BCC'}</Text>
            </View>
          </View>
        )}
        {!DeviceInfo.isTablet() && !!document?.file && (
          <Button
            block
            style={styles.btn}
            onPress={() => {
              if (modeStatus === 2 && document.status === 3) {
                startDownloadRefere();
              } else {
                startDownload();
              }
            }}
            disabled={downloadState.downloading || downloadState.opening}
          >
            <Text style={styles.btnText} uppercase={false}>
              {downloadState.downloading && 'Đang tải văn bản'}
              {downloadState.opening && 'Đang mở văn bản'}
              {!downloadState.downloading && !downloadState.opening && 'Xem nội dung văn bản'}
            </Text>
            {!downloadState.downloading && <Icon name="eye" style={styles.btnIcon} />}
            {downloadState.downloading && (
              <Spinner size="small" style={styles.btnIcon} color="white" />
            )}
          </Button>
        )}
      </View>
      <View style={styles.fieldWrapper}>
        {fields.map(({ formatter, formatters, icon, label, path, getTextStyle, paths, key }) => {
          const txtStyle = getTextStyle ? getTextStyle(document) : null;

          if (paths) {
            return (
              <IconField label={label} iconName={icon} key={key}>
                <Text style={txtStyle}>{getValueByKey(document, paths, formatters) || '-'}</Text>
              </IconField>
            );
          }
          return (
            <IconField label={label} iconName={icon} key={path}>
              <Text style={txtStyle}>{getValue(document, path, formatter) || '-'}</Text>
            </IconField>
          );
        })}
      </View>
    </ScrollView>
  );
};

Info.propTypes = {
  mode: PropTypes.number.isRequired,
  document: PropTypes.shape({}),
  deptRole: PropTypes.shape({}),
};
Info.defaultProps = {
  deptRole: null,
  document: null,
};

export default Info;
