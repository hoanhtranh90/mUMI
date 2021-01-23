import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';

import { DOC_USER_STATUS } from 'eoffice/constants/documents';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import Documents from '../common/Documents';
// import DateFilters from '../common/DateFilters';
import Header from '../list/ListHeader.container';
import DraftsHeading from './DraftsHeading.container';

const DraftsScreen = ({ navigation }) => {
  const status = navigation.getParam('status', '');
  const fromPH = Number(navigation.getParam('fromPH'));

  return (
    <Container>
      <Header navigation={navigation} status={status} />
      <DraftsHeading fromPH={fromPH} />
      {/* <DateFilters targetField="createTime" /> */}
      <View style={{ flex: 1, paddingTop: 10, paddingBottom: variables.isIphoneX ? 50 : 16 }}>
        <Documents
          onDocumentPressed={documentId => {
            global.hasDeeplink = null;
            navigation.navigate('DetailOutDocs', {
              documentId,
            });
          }}
        />
      </View>
    </Container>
  );
};

export default DraftsScreen;
