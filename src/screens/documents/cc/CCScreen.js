import PropTypes from 'prop-types';
import React from 'react';
import { Container, Title } from 'native-base';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { selectors } from 'eoffice/store/documents/detail';
import DocOverview from '../common/DocOverview';
import Header from './CCHeader';
import CC from './CC.container';

const CCScreen = ({ navigation, document }) => (
  <Container
    style={{
      borderTopLeftRadius: DeviceInfo.isTablet() ? 24 : 0,
      borderTopRightRadius: DeviceInfo.isTablet() ? 24 : 0,
      borderBottomLeftRadius: DeviceInfo.isTablet() ? 24 : 0,
      borderBottomRightRadius: DeviceInfo.isTablet() ? 24 : 0,
      paddingBottom: DeviceInfo.isTablet() ? 15 : 0,
    }}
  >
    {!DeviceInfo.isTablet() && <Header navigation={navigation} />}
    {DeviceInfo.isTablet() && (
      <Title
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        Chuyển tiếp văn bản
      </Title>
    )}
    <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingBottom: 10 }}>
      <DocOverview document={document} />
      <CC />
    </ScrollView>
  </Container>
);

CCScreen.propTypes = {
  document: PropTypes.shape({
    docCode: PropTypes.string,
    docDate: PropTypes.number,
    quote: PropTypes.string,
  }).isRequired,
};
const mapStateToProps = state => ({
  document: selectors.documentSelector(state),
});
export default connect(mapStateToProps)(CCScreen);
