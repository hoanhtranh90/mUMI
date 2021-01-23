/* eslint-disable import/no-extraneous-dependencies */
import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './ListHeader.container';
import Requests from './Requests.container';
import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
});

const ListScreen = ({ navigation, refreshQuery}) => {
  useEffect(() => {
    return () => {
      refreshQuery()
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Requests onRequestPressed={() => navigation.navigate('CommandDetail')} />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  refreshQuery: actions.reset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);

