import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Container, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import Documents from '../../common/Documents';
import { DOC_STATUS_DISPLAY, DOC_USER_STATUS } from '../../../../constants/documents';
import CountBadge from '../../common/CountBadge';
import UnRead from './UnRead.container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#efeff4',
  },
  header: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    height: 55,
  },
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
  },
  lineUnderTxtHeader: {
    width: 52,
    height: 4,
    backgroundColor: '#007aff',
  },
});

const ListDocuments = ({ navigation, contentMode, total, countToTrinh }) => {
  const status = Number(navigation.getParam('status'));
  const fromCXL = Number(navigation.getParam('fromCXL'));
  const isToTrinh = () =>
    [
      DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CHUA_YK].label,
      DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DCXL].label,
      DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DBL].label,
      DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CXL].label,
    ].includes(contentMode.label);
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View style={{ paddingLeft: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.txtHeader}>{contentMode.label}</Text>
            <View style={{ minWidth: 50 }}>
              <CountBadge
                bgColor={'rgba(57, 202, 116, 0.2)'}
                color={'#39ca74'}
                count={isToTrinh() ? countToTrinh[status] : total}
              />
            </View>
            {fromCXL === 1 && <UnRead from={'fromCXL'} />}
          </View>
          <View style={styles.lineUnderTxtHeader} />
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <Documents
          status={status}
          onDocumentPressed={documentId => {
            global.hasDeeplink = null;
            navigation.navigate('Details', {
              documentId,
            });
          }}
        />
      </View>
      <View style={{ flex: 1 }} />
    </Container>
  );
};

ListDocuments.propTypes = {
  contentMode: PropTypes.shape({}),
  total: PropTypes.number,
};

ListDocuments.defaultProps = {
  contentMode: DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHO_XU_LY],
  total: 0,
};

export default withNavigation(ListDocuments);
