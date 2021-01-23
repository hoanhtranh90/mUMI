import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LeftBar from './LeftBar.container';
import ListDocuments from './ListDocuments';
import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/documents/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 24,
    flexDirection: 'row',
  },
});

const BoxContent = ({ navigation, total, unreadReleased }) => {
  const [contentMode, setContentMode] = useState();
  const status = navigation.getParam('status', '')
  return (
    <View style={styles.container}>
      <LeftBar onChangeMode={type => setContentMode(type)} navigation={navigation} />
      <ListDocuments contentMode={contentMode} total={total} unreadReleased={unreadReleased} status={status} />
    </View>
  );
};

const mapStateToProps = state => ({
  total: selectors.totalSelector(state),
  unreadReleased: selectors.unreadReleasedSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxContent);
