import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, KeyboardAvoidingView } from 'react-native';
import { Spinner } from 'native-base';

import colors from 'eoffice/utils/colors';
import UserItem from '../../UserItem';
import Checkbox from '../../Checkbox';
import ModalWithFilter from '../ModalWithFilter';
import styles from './UserSelectModal.styles';
import useUserSelect from './useUserSelect';

const filterUsers = users => users.filter(user => user.selected);

const UserSelectModal = ({ isVisible, onClose, onSelected }) => {
  const [state, actions] = useUserSelect();
  const submit = () => {
    onSelected(filterUsers(state.users));
    onClose();
  };

  return (
    <KeyboardAvoidingView>
      <ModalWithFilter
        isVisible={isVisible}
        onClose={onClose}
        onSubmit={submit}
        onSearch={text => actions.setKeyword(text)}
      >
        <View style={styles.listWrapper}>
          <FlatList
            data={state.users}
            keyExtractor={item => item.id}
            onEndReached={() => state.hasMore && actions.nextPage()}
            onEndReachedThreshold={0.1}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            ListFooterComponent={<>{state.loading && <Spinner color={colors.blue} />}</>}
            renderItem={({ item }) => (
              <UserItem
                user={item}
                avatarSize={40}
                containerStyle={styles.userContainer}
                onPress={() => actions.toggleUser(item.id)}
                ActionComponent={<Checkbox checked={item.selected} style={styles.checkbox} />}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ModalWithFilter>
    </KeyboardAvoidingView>
  );
};

UserSelectModal.propTypes = {
  onSelected: PropTypes.func.isRequired,

  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
UserSelectModal.defaultProps = {
  isVisible: false,
  onClose() {},
};

export default UserSelectModal;
