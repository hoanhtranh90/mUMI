import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Header from './DetailHeader';
import CommandForm from './CommandForm.container';
import RoundButton from '../../common/RoundButton';
import CommandScreen from './CommandScreen.container';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
});

const DetailScreen = ({ navigation, actionList, hcCaseCommand }) => {
  const [isShowModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          {!isShowModal && <CommandForm />}
          {isShowModal && (
            <CommandScreen
              onUpdate={() => setShowModal(false)}
              hcCaseCommand={hcCaseCommand}
              actionList={actionList}
            />
          )}
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        {!isShowModal && (
          <>
            {actionList.map((data, index) => (
              <RoundButton
                title={data.actionName}
                color="#fff"
                key={index.toString()}
                titleColor="#007aff"
                onPress={() => setShowModal(true)}
              />
            ))}
          </>
        )}
      </View>
    </View>
  );
};

DetailScreen.propTypes = {
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  hcCaseCommand: PropTypes.shape({}),
};
DetailScreen.defaultProps = {
  actionList: [],
  hcCaseCommand: {},
};

export default DetailScreen;
