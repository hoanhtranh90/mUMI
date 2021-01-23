import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { ScrollView } from 'react-native';

import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import { selectors as listSelectors } from 'eoffice/store/documents/list';
import { selectors as detailSelectors } from 'eoffice/store/documents/detail';
import DocOverview from '../common/DocOverview';
import Header from './ForwardHeader';
// import ForwardDepartments from './ForwardDepartments';
import ForwardIncomingDoc from './ForwardIncomingDoc';
import ForwardOutgoingDoc from './ForwardOutgoingDoc.container';

const ForwardScreen = ({ canChuyenXuLyDonvi, mode, navigation, document }) => {
  const isDept = navigation.getParam('isDept', false);
  let modeStatus = null;
  if (global.hasDeeplink) {
    modeStatus = global.typeDocDetail;
  } else {
    modeStatus = mode;
  }
  return (
    <Container>
      <Header
        canChuyenXuLyDonvi={canChuyenXuLyDonvi}
        navigation={navigation}
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DocOverview document={document} />
        {modeStatus === DOCUMENT_TYPE.VB_DEN && !isDept && <ForwardIncomingDoc />}
        {modeStatus === DOCUMENT_TYPE.VB_DI && <ForwardOutgoingDoc />}
      </ScrollView>
    </Container>
  );
};

ForwardScreen.propTypes = {
  document: PropTypes.shape({
    docCode: PropTypes.string,
    docDate: PropTypes.number,
    quote: PropTypes.string,
  }).isRequired,
  canChuyenXuLyDonvi: PropTypes.bool.isRequired,
  mode: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  document: detailSelectors.documentSelector(state),
  canChuyenXuLyDonvi: detailSelectors.canChuyenXuLyDonviSelector(state),
  mode: listSelectors.modeSelector(state),
});

export default connect(mapStateToProps)(ForwardScreen);
