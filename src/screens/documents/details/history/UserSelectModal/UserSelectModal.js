import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

import ModalWithFilter from 'eoffice/components/modals/ModalWithFilter';
import Checkbox from 'eoffice/components/Checkbox';
import UserItem from 'eoffice/components/UserItem';
import colors from 'eoffice/utils/colors';
import useListUsers from './useListUsers';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  cb: {
    marginHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginLeft: 50,
  },
});

const UserSelectModal = ({ documentId, isVisible, mode, onClose, onSelected }) => {
  const [state, actions] = useListUsers(mode, documentId, '');

  useEffect(() => {
      if (documentId) {
        actions.init();
      }
    }, [documentId]);

  const submit = () => {
    const users = state.usersSelected.filter(user => state.selected[user.id]);
    if (users.length === 0) {
      actions.filter('')
    }
    // actions.saveListUser(state.usersSelected)
    onSelected(users);
    onClose();
  };
  let savedTimeout = null
  const searchFilter = (text) => {
    if (mode === DOCUMENT_TYPE.VB_DI) {
      if (savedTimeout) {
        clearTimeout(savedTimeout)
      }
      savedTimeout = setTimeout(() => {
        actions.filter(text)
      }, 1000);
    } else {
      actions.filterVbDen(text)
    }
  };
  return (
    <ModalWithFilter
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={submit}
      onSearch={text => searchFilter(text)}
    >
      {state.loading && <Spinner />}
      {!state.loading && (
        <FlatList
          data={state.users}
          extraData={state.selected}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              avatarSize={40}
              containerStyle={styles.itemContainer}
              onPress={() => actions.toggle(item)}
              ActionComponent={<Checkbox checked={state.selected[item.id]} style={styles.cb} />}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </ModalWithFilter>
  );
};

UserSelectModal.propTypes = {
  onSelected: PropTypes.func.isRequired,
  documentId: PropTypes.string,
  mode: PropTypes.number.isRequired,

  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
UserSelectModal.defaultProps = {
  isVisible: false,
  documentId: '',
  onClose() { },
};

export default UserSelectModal;
