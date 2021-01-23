import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Right } from 'native-base';
import format from 'date-fns/format';

import { HIGH_LEVELS_PIORITY_IDS } from 'eoffice/constants/documents';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
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
    marginRight: 6,
    height: 12,
    width: null,
    textAlignVertical: 'center',
  },
  date: { color: colors.darkGray, fontSize: 12 },
});

const DocumentRow = ({
  quote,
  docCode,
  docDate,
  docTypeName,
  onPress,
  priorityId,
  priorityName,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Text style={styles.quote}>{quote}</Text>
    <View style={styles.detailRow}>
      {docTypeName && (
        <View style={styles.docTypeWrap}>
          <Text style={styles.docType}>{docTypeName}</Text>
        </View>
      )}
      {docCode && <Text style={styles.docCode}>{docCode}</Text>}
      {HIGH_LEVELS_PIORITY_IDS.indexOf(priorityId) >= 0 && (
        <View style={styles.priorityWrap}>
          <Icon name="zap" style={styles.priorityIcon} />
          <Text style={styles.priorityName}>{priorityName}</Text>
        </View>
      )}
      {docDate && (
        <Right style={styles.fieldDate}>
          <View style={styles.dateWrap}>
            <Icon name="clock" type="MaterialCommunityIcons" style={styles.dateIcon} />
            <Text style={styles.date}>{format(new Date(docDate), 'dd/MM/yyyy')}</Text>
          </View>
        </Right>
      )}
    </View>
  </TouchableOpacity>
);

DocumentRow.propTypes = {
  onPress: PropTypes.func.isRequired,

  docCode: PropTypes.string,
  docDate: PropTypes.number,
  docTypeName: PropTypes.string,
  priorityId: PropTypes.string,
  priorityName: PropTypes.string,
  quote: PropTypes.string,
};
DocumentRow.defaultProps = {
  docCode: '',
  docDate: null,
  docTypeName: '',
  priorityId: '',
  priorityName: '',
  quote: '',
};

export default DocumentRow;
