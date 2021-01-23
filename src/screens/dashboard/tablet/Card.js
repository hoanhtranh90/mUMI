import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { Card, CardItem, Text, Spinner } from 'native-base';

import variables from 'eoffice/native-base-theme/variables/commonColor';
import colors from 'eoffice/utils/colors';
import useCardList from './useCardList';

const styles = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 16,
    width: Math.floor((variables.deviceWidth - 90) / 2),
    height: variables.deviceHeight * 0.67,
  },
  img: {
    height: 45,
    width: 45,
    marginRight: 16,
    marginBottom: 9,
  },
  headerCard: {
    paddingBottom: 0,
  },

  labelContainer: {
    borderBottomColor: colors.lighterGray,
    borderBottomWidth: 1,
    paddingBottom: 9,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  label: { fontSize: 17, fontWeight: 'bold' },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  docCount: {
    fontSize: 15,
    color: colors.darkGray,
  },
  newWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.lighterGray,
    borderRadius: 4,
    marginLeft: 6,
  },
  newCount: {
    fontSize: 13,
    color: colors.green,
    fontWeight: '600',
  },
  separator: {
    borderBottomColor: colors.lighterGray,
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  cardContent: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  moreText: { color: colors.blue, fontSize: 13, fontWeight: '500', paddingLeft: 3 },
  emptyContainer: { justifyContent: 'center', alignItems: 'center' },
  emptyImg: { width: 83, height: 85, marginBottom: 16 },
});

const Empty = () => (
  <View style={styles.emptyContainer}>
    <Image
      style={styles.emptyImg}
      source={{
        uri:
          'data:image/jpeg;base64,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',
      }}
    />
    <Text>Không có dữ liệu</Text>
  </View>
);
const Separator = () => <View style={styles.separator} />;

const CustomCard = ({
  color,
  countPrefix,
  img,
  label,
  loadData,
  onPress,
  renderItem,
  stylesConfig,
}) => {
  const [state, actions] = useCardList(loadData);

  useEffect(() => {
    actions.init(); //
    const refreshDashboard = DeviceEventEmitter.addListener('refreshDashboard', () => {
      actions.init();
    });
    return () => {
      refreshDashboard.remove();
    };
  }, []);
  return (
    <Card style={stylesConfig}>
      <CardItem header button onPress={onPress} style={styles.headerCard}>
        <Image style={styles.img} resizeMode="contain" source={img} />
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color }]}>{label}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.docCount}>{`${state.count} ${countPrefix}`}</Text>
            <View style={styles.newWrapper}>
              <Text style={styles.newCount}>{`${state.countNew} mới`}</Text>
            </View>
          </View>
        </View>
      </CardItem>
      <CardItem
        style={[
          styles.cardContent,
          {
            alignItems: state.list?.length > 0 && state.list !== null ? 'stretch' : 'center',
            flexDirection: state.list?.length > 0 && state.list !== null ? 'column' : 'row',
          },
        ]}
      >
        {state.loading && <Spinner />}
        {!state.loading && (
          <FlatList
            data={state.list}
            renderItem={({ item }) => renderItem(item)}
            ListEmptyComponent={<Empty />}
            ItemSeparatorComponent={Separator}
          />
        )}
      </CardItem>
      <CardItem footer button onPress={onPress} style={{ paddingTop: 0 }}>
        <Text style={styles.moreText}>Xem thêm</Text>
      </CardItem>
    </Card>
  );
};

CustomCard.propTypes = {
  color: PropTypes.string.isRequired,
  img: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,

  countPrefix: PropTypes.string,
  loadData: PropTypes.func,
  renderItem: PropTypes.func,
  stylesConfig: PropTypes.shape({}),
};
CustomCard.defaultProps = {
  countPrefix: '',
  loadData: null,
  renderItem() {},
  stylesConfig: {},
};

export default CustomCard;
