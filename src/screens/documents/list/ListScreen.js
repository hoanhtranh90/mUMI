import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';

import variables from 'eoffice/native-base-theme/variables/commonColor';
import Header from './ListHeader.container';
import DateFilters from '../common/DateFilters';
import Documents from '../common/Documents';

const ListScreen = ({ navigation }) => {
  const status = Number(navigation.getParam('status'));
  const type = Number(navigation.getParam('type'));
  const isIn = Number(navigation.getParam('isIn'));
  const fromCXL = Number(navigation.getParam('fromCXL'));
  return (
    <Container>
      <Header navigation={navigation} status={status} type={type} />
      <View style={{ flex: 1, paddingBottom: variables.isIphoneX ? 50 : 16 }}>
        {/* <DateFilters targetField="docDate" targetLabel="Ngày văn bản" type={type} isIn={isIn} /> */}
        <DateFilters
          targetField="docDate"
          targetLabel="Ngày chuyển"
          type={type}
          isIn={isIn}
          fromCXL={fromCXL}
        />
        <Documents
          status={status}
          onDocumentPressed={documentId => {
            global.hasDeeplink = null;
            navigation.navigate('Details', {
              documentId,
            });
          }}
        />
      </View>
    </Container>
  );
};

export default ListScreen;
