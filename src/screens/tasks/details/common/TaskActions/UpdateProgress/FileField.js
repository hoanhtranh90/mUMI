import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'native-base';

import Attachment from '../../../info/Attachments/Attachment';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
  },
  separator: {
    height: 8,
  },
  wrapper: { flexDirection: 'row', alignItems: 'center' },
  attachment: {
    flex: 1,
  },
  removeBtn: {
    flex: 0,
  },
  removeIcon: {
    fontSize: 20,
    marginLeft: 8,
    marginRight: 0,
  },
  uploadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? '49%' : '100%',
  },
  uploadIcon: {
    fontSize: 18,
  },
});

const FileField = ({ actions, state }) => {
  return <>
    <FlatList
      style={{ width: '100%', paddingBottom: state.files.length ? 8 : 0 }}
      contentContainerStyle={styles.container}
      data={state.files}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.wrapper}>
          <View style={styles.attachment}>
            <Attachment {...item} />
          </View>
          <Button
            transparent
            icon
            danger
            style={styles.removeBtn}
            onPress={() => actions.remove(item.id)}
          >
            <Icon name="x-circle" style={styles.removeIcon} />
          </Button>
        </View>
      )}
    />
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }}
    >
      <Button
        bordered
        disabled={state.loading}
        icon
        onPress={() => actions.upload(false)}
        small
        style={styles.uploadBtn}
      >
        <Icon name="upload-cloud" style={styles.uploadIcon} />
      </Button>
      {Platform.OS === 'ios' && (
        <Button
          bordered
          disabled={state.loading}
          icon
          onPress={() => actions.upload(true)}
          small
          style={styles.uploadBtn}
        >
          <Icon name="image" style={styles.uploadIcon} />
        </Button>
      )}
    </View>
  </>
}

FileField.propTypes = {
  actions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default FileField;
