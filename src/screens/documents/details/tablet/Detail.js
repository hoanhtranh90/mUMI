import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { ACTION_HISTORY_LABELS } from 'eoffice/constants/documents';
import { Text } from 'native-base';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import InfoContainer from '../info/Info.container';
import ProcessContainer from '../process/Process.container';
import ActionHistoryContainer from '../history/ActionHistory.container';
import FooterContainer from '../history/Footer.container';
import LabelTabDetailDocument from '../../../../components/Tablet/LabelTabDetailDocument';
import RelationDocsContainer from '../relationDocs/RelationDocs.container';
import PhieuYKienContainer from '../phieuYKien/PhieuYKiens.container';

const styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: '#f8f9fd',
  },
  leftField: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(171, 180, 189, 0.25)',
    borderWidth: 1,
    borderRightWidth: 0.5,
  },
  rightField: {
    flex: 1,
    backgroundColor: '#f8f9fd',
    borderColor: 'rgba(171, 180, 189, 0.25)',
    borderWidth: 1,
    borderLeftWidth: 0.5,
  },
  txtExtend: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 12,
    color: '#007aff',
    alignSelf: 'center',
  },
});

const getActionLogHeader = item =>
  ACTION_HISTORY_LABELS[item.actionName] || { label: item.actionName };

const Detail = () => {
  const [extendDetail, setExtendDetail] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.field}>
      <ScrollView
        style={styles.leftField}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: extendDetail ? 9 : 1.1 }}>
            {extendDetail && (
              <View style={{ flex: 1 }}>
                <InfoContainer />
              </View>
            )}
            {!extendDetail && (
              <View style={{ height: variables.deviceHeight * 0.45 }}>
                <InfoContainer />
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                setExtendDetail(!extendDetail);
              }}
            >
              <Text style={styles.txtExtend}>{extendDetail ? 'Thu gọn' : 'Xem thêm'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingTop: 8 }}>
            <RelationDocsContainer />
          </View>
          <View style={{ flex: 1, paddingTop: 8 }}>
            <PhieuYKienContainer />
          </View>
          <View style={{ flex: 1, paddingTop: 1 }}>
            <LabelTabDetailDocument type={0} />
            <ScrollView>
              <ProcessContainer />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.rightField}>
        <ActionHistoryContainer getActionLogHeader={getActionLogHeader} />
        <FooterContainer />
      </View>
    </View>
  );
};

export default Detail;
