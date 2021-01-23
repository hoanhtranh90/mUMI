import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { CardItem, Icon, Text, Card, Form } from 'native-base';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import colors from 'eoffice/utils/colors';

import { formatTimestamp } from 'eoffice/utils/utils';
import useModal from 'eoffice/utils/useModal';
import IconField from 'eoffice/components/IconField';
import styles from './Node.styles';

const getModalTitle = (id, titleOnly) => {
  if (id === 'donViBanHanh' || titleOnly) {
    return 'Thông tin ban hành';
  }

  if (id === 'donViChuyenTiep') {
    return 'Thông tin chuyển tiếp';
  }

  if (id === 'editor') {
    return 'Thông tin người soạn thảo';
  }

  return 'Thông tin chuyển xử lý';
};

const stylesTablet = StyleSheet.create({
  wrapper: {
    width: 400,
    borderColor: colors.lighterGray,
    borderWidth: 1,
    borderRadius: 4,
    flexWrap: 'nowrap',
    paddingBottom: 0,
  },
  icon: {
    fontSize: 20,
  },
});

const Node = React.memo(
  ({
    id,
    badge,
    badgeColor,
    textColor,
    checked,
    deptName,
    editorId,
    expanded,
    hasChildren,
    isDept,
    onPress,
    loginId,
    receiverId,
    rounded,
    style,
    subtitle,
    timestamp,
    title,
    titleOnly,
  }) => {
    const [isVisible, open, close] = useModal();

    if (rounded) {
      return (
        <View
          style={[
            DeviceInfo.isTablet() ? stylesTablet.wrapper : styles.wrapper,
            styles.shortWrapper,
            styles.rounded,
          ]}
        >
          <CardItem
            button
            onPress={onPress}
            style={[
              styles.cardItem,
              styles.rounded,
              styles.whiteBg,
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              },
            ]}
          >
            {id === 'tuChoi' && <Icon name="x-circle" style={styles.tuChoiIcon} />}
            <Text style={[styles.subtitle, id === 'tuChoi' ? styles.redText : null]}>{title}</Text>
          </CardItem>
        </View>
      );
    }

    const highlight = receiverId === loginId || editorId === loginId;
    return (
      <>
        <View
          style={[
            DeviceInfo.isTablet() ? stylesTablet.wrapper : styles.wrapper,
            highlight ? styles.highlight : null,
            style,
          ]}
        >
          <CardItem
            button
            onLongPress={open}
            onPress={onPress}
            style={[styles.cardItem, !hasChildren || expanded ? styles.whiteBg : null]}
          >
            <Text style={styles.title} numberOfLines={isDept ? 2 : 1}>
              {title}
            </Text>
            {!titleOnly && !isDept && <Text style={styles.subtitle}>{subtitle}</Text>}
            {!titleOnly && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingTop: 8,
                }}
              >
                {hasChildren && expanded && (
                  <Icon
                    type="Feather"
                    name={DeviceInfo.isTablet() ? 'minus-circle' : 'minus-square'}
                    style={[styles.icon, styles.minusIcon]}
                  />
                )}
                {hasChildren && !expanded && (
                  <Icon
                    type="Feather"
                    name={DeviceInfo.isTablet() ? 'plus-circle' : 'plus-square'}
                    style={styles.icon}
                  />
                )}
                {!!badge && (
                  <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                    <Text style={[styles.badgeText, { color: textColor }]}>{badge}</Text>
                  </View>
                )}
                {checked && (
                  <View style={styles.checkWrapper}>
                    <Icon type="Feather" name="check" style={[styles.icon, styles.checkIcon]} />
                  </View>
                )}
              </View>
            )}
          </CardItem>
        </View>
        <Modal isVisible={isVisible} onBackdropPress={close} onBackButtonPress={close}>
          <Card style={{ padding: 10, borderRadius: 4 }}>
            <Text
              style={{ paddingVertical: 8, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
            >
              {getModalTitle(id, titleOnly)}
            </Text>
            <Form style={{ flexDirection: 'column' }}>
              {!isDept && (
                <>
                  <IconField label="Họ Tên" iconName="user">
                    <Text>{title}</Text>
                  </IconField>
                  <IconField label="Đơn vị" iconName="map-pin">
                    <Text>{deptName}</Text>
                  </IconField>
                  <IconField label="Chức vụ" iconName="credit-card">
                    <Text>{subtitle}</Text>
                  </IconField>
                </>
              )}
              {isDept && (
                <IconField label="Đơn vị" iconName="map-pin">
                  <Text>{title}</Text>
                </IconField>
              )}
              <IconField label="Thời gian chuyển" iconName="clock">
                <Text>{formatTimestamp(timestamp)}</Text>
              </IconField>
            </Form>
          </Card>
        </Modal>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.expanded === nextProps.expanded
);

Node.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  badge: PropTypes.string,
  badgeColor: PropTypes.string,
  textColor: PropTypes.string,
  checked: PropTypes.bool,
  deptName: PropTypes.string,
  editorId: PropTypes.string,
  expanded: PropTypes.bool,
  hasChildren: PropTypes.bool,
  isDept: PropTypes.bool,
  loginId: PropTypes.string,
  onPress: PropTypes.func,
  receiverId: PropTypes.string,
  rounded: PropTypes.bool,
  style: PropTypes.shape({}),
  subtitle: PropTypes.string,
  timestamp: PropTypes.number,
  titleOnly: PropTypes.bool,
};
Node.defaultProps = {
  badge: null,
  badgeColor: null,
  checked: false,
  deptName: '-',
  editorId: '',
  textColor: '',
  expanded: false,
  hasChildren: false,
  isDept: false,
  loginId: '',
  onPress() {},
  receiverId: '',
  rounded: false,
  style: {},
  subtitle: '-',
  timestamp: '-',
  titleOnly: false,
};

export default Node;
