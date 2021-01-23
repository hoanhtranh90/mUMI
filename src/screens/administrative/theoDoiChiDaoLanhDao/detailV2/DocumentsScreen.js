/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Right, Text, View } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../detail/DetailHeader';
import * as service from 'eoffice/store/administrative/theoDoiChiDaoLanhDao/service';
import LabelTabDetailRelatedDoc from '../../../../components/Tablet/LabelTabDetailRelatedDoc';
import colors from 'eoffice/utils/colors';
import { format } from 'date-fns';
import useDownloadV2 from '../../../../utils/useDownloadV2';
import { selectors } from '../../../../store/administrative/theoDoiChiDaoLanhDao';
import { connect } from 'react-redux';

const RelationDoc = ({ item, idx }) => {
  const { state, downloadFileForHcCommandsDocRelation } = useDownloadV2({ isOpen: true });
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => {
        downloadFileForHcCommandsDocRelation(
          item.objectId,
          item.objectType,
          item.referenceObjectType,
          item.referenceObjectId
        );
      }}
    >
      <Text style={styles.quote}>
        {item.quote !== null ? item.quote : `Văn bản liên quan (${idx + 1})`}
      </Text>
      <View style={styles.detailRow}>
        {item.docTypeName && (
          <View style={styles.docTypeWrap}>
            <Text style={styles.docType}>{item.docTypeName}</Text>
          </View>
        )}
        {item.docCode && <Text style={styles.docCode}>{item.docCode}</Text>}
        {state.downloading && (
          <Text style={[styles.textTouchable, { paddingLeft: 8 }]}>Đang tải..</Text>
        )}
        {item.docDate && (
          <Right style={styles.fieldDate}>
            <View style={styles.dateWrap}>
              <Icon name="clock" type="MaterialCommunityIcons" style={styles.dateIcon} />
              <Text style={styles.date}>{format(new Date(item.docDate), 'dd/MM/yyyy')}</Text>
            </View>
          </Right>
        )}
      </View>
    </TouchableOpacity>
  );
};

const DocumentsScreen = ({ navigation, itemDetail, hcCaseCommands }) => {
  const [lstVB, setLstVB] = useState([]);
  const [lstVBReport, setLstVBReport] = useState([]);
  const [isMinusVB, setIsMinusVB] = useState(false);
  useEffect(
    () => {
      const data = navigation.getParam('detail');
      if (data && data.item) {
        getFileDinhKem(data.item);
      } else {
        if (itemDetail) {
          getFileDinhKem(itemDetail);
        }
      }
    },
    [itemDetail]
  );

  useEffect(
    () => {
      getFileAttachmentReport(hcCaseCommands);
    },
    [hcCaseCommands]
  );

  async function getFileDinhKem(item) {
    if (item.hcCaseCommandsCommonId) {
      const lstAttachments = await service.getFileAttachments(item.hcCaseCommandsCommonId);
      if (lstAttachments.length > 0) {
        setLstVB(lstAttachments);
      }
    }
  }

  async function getFileAttachmentReport(hcCaseCommands) {
    if (hcCaseCommands.id) {
      const lstVBReport = await service.getFileAttachmentsReport(hcCaseCommands.id);
      if (lstVBReport) {
        setLstVBReport(lstVBReport);
      }
    }
  }

  return (
    <Container>
      <Header navigation={navigation} />
      <Text style={styles.headerTxt}>CÔNG VĂN LIÊN QUAN</Text>
      {lstVB.length > 0 && (
        <>
          <LabelTabDetailRelatedDoc
            count={lstVB.length}
            type={2}
            onPress={() => {
              setIsMinusVB(!isMinusVB);
            }}
            isMinus={isMinusVB}
          />
          {!isMinusVB && (
            <FlatList
              style={styles.listWrapper}
              data={lstVB}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => <RelationDoc idx={index} item={item} />}
              ListEmptyComponent={
                <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
                  Không có văn bản đính kèm
                </Text>
              }
            />
          )}
        </>
      )}
      {lstVBReport.length > 0 && <LabelTabDetailRelatedDoc count={lstVBReport.length} type={4} />}
      <FlatList
        style={styles.listWrapper}
        data={lstVBReport}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <RelationDoc idx={index} item={item} />}
      />
    </Container>
  );
};

DocumentsScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused
          ? require('eoffice/assets/document.png')
          : require('eoffice/assets/document-gray.png')
      }
    />
  ),
  tabBarOnPress: ({ navigation }) => navigation.navigate('DocumentsScreen'),
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingBottom: 15,
  },
  headerTxt: {
    fontSize: 19,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    color: '#084386',
  },
  wrapper: {
    marginHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  fieldDate: {
    flex: 1,
  },
  quote: { color: colors.darkGray, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 4 },
  docTypeWrap: {
    borderRadius: 4,
    borderColor: colors.lightGray,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 8,
  },
  docType: { color: '#2b2d50', fontSize: 12, lineHeight: 16 },
  docCode: { marginRight: 8, fontSize: 12 },
  priorityWrap: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 8,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  priorityIcon: { color: colors.red, fontSize: 13, width: 19 },
  priorityName: { color: '#2b2d50', fontSize: 12, lineHeight: 16 },
  dateWrap: { flexDirection: 'row' },
  dateIcon: {
    color: colors.gray,
    fontSize: 12,
    marginRight: 4,
    height: 12,
    marginTop: 2,
    textAlignVertical: 'center',
  },
  date: { color: colors.darkGray, fontSize: 12 },
  textTouchable: { fontSize: 13, color: '#007aff' },
});

const mapStateToProps = state => ({
  itemDetail: selectors.itemDetailSelector(state),
  hcCaseCommands: selectors.hcCaseCommandsSelector(state),
});

export default connect(
  mapStateToProps,
  null
)(DocumentsScreen);
