import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View, Icon, Right } from 'native-base';
import { format } from 'date-fns';
import colors from 'eoffice/utils/colors';
import { DOC_RELATION_OBJECT_TYPE } from '../../../../constants/documents';
import useDownload from '../../../../utils/useDownload';
import {
  DOWNLOAD_TYPES,
  DOCRELATION_TYPE,
  DOCRELATION_TEXT_TYPE,
} from '../../../../constants/common';

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  fieldDate: {
    flex: 1,
  },
  quote: { color: colors.darkGray, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 4 },
  docTypeWrap: {
    borderRadius: 4,
    borderColor: colors.lightGray,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 8,
  },
  docType: { color: '#2b2d50', fontSize: 12, lineHeight: 16 },
  docCode: { marginRight: 8, fontSize: 12 },
  priorityWrap: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 8,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  priorityIcon: { color: colors.red, fontSize: 13, width: 19 },
  priorityName: { color: '#2b2d50', fontSize: 12, lineHeight: 16 },
  dateWrap: { flexDirection: 'row' },
  dateIcon: {
    color: colors.gray,
    fontSize: 12,
    marginRight: 4,
    height: 12,
    marginTop: 2,
    textAlignVertical: 'center',
  },
  date: { color: colors.darkGray, fontSize: 12 },
  textTouchable: { fontSize: 13, color: '#007aff' },
});

const RelationDoc = ({ item, idx }) => {
  // eslint-disable-next-line no-unused-vars
  const [
    downloadState,
    startDownload,
    startDownloadPdf,
    startDownloadRefere,
    startDownloadRelationDoc,
  ] = useDownload({
    attachmentId: item.id,
    open: true,
    type:
      item.objectTypeRelateTo === DOC_RELATION_OBJECT_TYPE.ATTACHMENT
        ? DOWNLOAD_TYPES.ORIGINAL
        : DOWNLOAD_TYPES.PDF,
    fileName: item.quote !== null ? item.quote : `Văn bản liên quan (${idx + 1})`,
    documentId: item.id,
  });
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => {
        startDownloadRelationDoc();
      }}
    >
      <Text style={styles.quote}>
        {item.quote !== null ? item.quote : `Văn bản liên quan (${idx + 1})`}
      </Text>
      <View style={styles.detailRow}>
        {item.docTypeName && (
          <View style={styles.docTypeWrap}>
            <Text style={styles.docType}>{item.docTypeName}</Text>
          </View>
        )}
        {item.docCode && <Text style={styles.docCode}>{item.docCode}</Text>}
        <View style={styles.priorityWrap}>
          {item.relationType === DOCRELATION_TYPE.CAN_CU && (
            <Text style={styles.priorityName}>{DOCRELATION_TEXT_TYPE.CAN_CU}</Text>
          )}
          {item.relationType === DOCRELATION_TYPE.TO_TRINH && (
            <Text style={styles.priorityName}>{DOCRELATION_TEXT_TYPE.TO_TRINH}</Text>
          )}
          {item.relationType !== DOCRELATION_TYPE.CAN_CU &&
            item.relationType !== DOCRELATION_TYPE.TO_TRINH && (
              <Text style={styles.priorityName}>{DOCRELATION_TEXT_TYPE.KHAC}</Text>
            )}
        </View>
        {downloadState.downloading && (
          <Text style={[styles.textTouchable, { paddingLeft: 8 }]}>Đang tải..</Text>
        )}
        {item.docDate && (
          <Right style={styles.fieldDate}>
            <View style={styles.dateWrap}>
              <Icon name="clock" type="MaterialCommunityIcons" style={styles.dateIcon} />
              <Text style={styles.date}>{format(new Date(item.docDate), 'dd/MM/yyyy')}</Text>
            </View>
          </Right>
        )}
      </View>
    </TouchableOpacity>
  );
};

RelationDoc.propTypes = {
  item: PropTypes.shape({}).isRequired,
  idx: PropTypes.number.isRequired,
};

export default RelationDoc;
