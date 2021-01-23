import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Container, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import Documents from '../../common/Documents';
import { DOC_STATUS_DISPLAY, DOC_USER_STATUS } from '../../../../constants/documents';
import DraftsHeadingContainer from '../DraftsHeading.container';
import CountBadge from '../../common/CountBadge';
import UnRead from '../../list/tablet/UnRead.container';
import { from } from 'rxjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#efeff4',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 55,
  },
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
  },
  lineUnderTxtHeader: { width: 52, height: 4, backgroundColor: '#007aff' },
});
const ListDocuments = ({ navigation, contentMode, total, unreadReleased, status }) => {
  const fromPH = Number(navigation.getParam('fromPH'));

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View style={{ paddingLeft: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.txtHeader}>{contentMode.label}</Text>
            {status && DOC_STATUS_DISPLAY[status] ? (
              <View style={{ minWidth: 50 }}>
                <CountBadge
                  bgColor={DOC_STATUS_DISPLAY[status].bgColor}
                  color={DOC_STATUS_DISPLAY[status].color}
                  count={status === DOC_USER_STATUS.DA_PHAT_HANH ? unreadReleased : total}
                />
              </View>
            ) : null}
            {fromPH === 1 && <UnRead from={'fromPH'} />}
          </View>
          <View style={styles.lineUnderTxtHeader} />
        </View>
      </View>
      <DraftsHeadingContainer />
      <View style={{ flex: 4 }}>
        <Documents
          onDocumentPressed={documentId => {
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
  unreadReleased: PropTypes.number,
  status: PropTypes.number,
};

ListDocuments.defaultProps = {
  contentMode: DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHO_XU_LY],
  total: 0,
  unreadReleased: 0,
};

export default withNavigation(ListDocuments);
