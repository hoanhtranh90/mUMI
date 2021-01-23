import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-native-easy-grid';
import { Card, CardItem, Icon, Text } from 'native-base';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameHour from 'date-fns/isSameHour';
import isAfter from 'date-fns/isAfter';
import colors from 'eoffice/utils/colors';

import {
  HIGH_LEVELS_PIORITY_IDS,
  HIGH_LEVELS_SECURITY_IDS,
  RELATION_TYPE,
} from 'eoffice/constants/documents';
import styles from './Document.styles';

function canShowPriority(id) {
  return HIGH_LEVELS_PIORITY_IDS.indexOf(id) >= 0;
}
function canShowSecurity(id) {
  return HIGH_LEVELS_SECURITY_IDS.indexOf(id) >= 0;
}

const Document = ({ document, onPress, onLongPress, ErrorNetWork }) => (
  <Card transparent style={styles.card}>
    <CardItem style={styles.cardItem} button onPress={onPress} onLongPress={onLongPress}>
      <Grid>
        <Row>
          {!!document?.docTypeName && (
            <View style={[styles.badge, styles.shrink]}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {document?.docTypeName}
              </Text>
            </View>
          )}
          {canShowSecurity(document?.securityId) && (
            <View style={styles.badge}>
              <Icon name="shield" type="Feather" style={styles.badgeIcon} />
              <Text style={styles.badgeText}>{document?.securityName}</Text>
            </View>
          )}
          {canShowPriority(document?.priorityId) && (
            <View style={styles.badge}>
              <Icon name="zap" type="Feather" style={styles.badgeIcon} />
              <Text style={styles.badgeText}>{document?.priorityName}</Text>
            </View>
          )}
          {!!document?.docDate && (
            <View style={[styles.badge, styles.noBorder]}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <Icon
                  name="clock"
                  type="MaterialCommunityIcons"
                  style={[styles.badgeIcon, styles.timeIcon]}
                />
                <Text style={styles.badgeText}>
                  {format(new Date(document?.docDate), 'dd/MM/yyyy')}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                {document?.deadlineDate && (
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="clock"
                      type="MaterialCommunityIcons"
                      style={{
                        ...styles.badgeIcon,
                        color:
                          isSameDay(new Date(), new Date(document?.deadlineDate)) ||
                          isSameDay(
                            new Date().setDate(new Date().getDate() + 1),
                            new Date(document?.deadlineDate)
                          )
                            ? '#F0C330'
                            : isAfter(new Date(), new Date(document?.deadlineDate))
                            ? '#E54D42'
                            : colors.gray,
                      }}
                    />
                    <Text
                      style={{
                        ...styles.badgeText,
                        color:
                          isSameDay(new Date(), new Date(document?.deadlineDate)) ||
                          isSameDay(
                            new Date().setDate(new Date().getDate() + 1),
                            new Date(document?.deadlineDate)
                          )
                            ? '#F0C330'
                            : isAfter(new Date(), new Date(document?.deadlineDate))
                            ? '#E54D42'
                            : colors.gray,
                      }}
                    >
                      {format(new Date(document?.deadlineDate), 'dd/MM/yyyy')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </Row>
        <Row style={styles.titleWrapper}>
          <Text style={[styles.title, !document?.isSeen ? styles.unread : null]}>
            {document?.quote}
          </Text>
        </Row>
        <Row style={styles.lastRow}>
          {document?.docCode && <Text style={styles.documentId}>{document?.docCode}</Text>}
          {document?.relationType === RELATION_TYPE.NGUOI_DUOC_BCC && (
            <View style={styles.bccWrap}>
              <Icon name="warning" type="AntDesign" style={styles.bccIcon}/>
              <Text style={styles.bccText}>{document?.vbDocBccInfoId ? 'BCC-DT' : 'BCC'}</Text>
            </View>
          )}
          <Row>{ErrorNetWork}</Row>
        </Row>
      </Grid>
    </CardItem>
  </Card>
);

// TODO correct document structure
Document.propTypes = {
  document: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    deptEditorName: PropTypes.string,
    publisherName: PropTypes.string,
    docCode: PropTypes.string,
    docDate: PropTypes.number,
    docTypeName: PropTypes.string,
    priorityId: PropTypes.string,
    priorityName: PropTypes.string,
    securityId: PropTypes.string,
    securityName: PropTypes.string,
  }).isRequired,
  ErrorNetWork: PropTypes.node,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};
Document.defaultProps = {
  ErrorNetWork: null,

  onPress() {},
  onLongPress() {},
};

export default Document;
