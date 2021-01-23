import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spinner, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import NetworkState from 'react-native-network-state';

import { DOCUMENT_TYPE, DOC_USER_STATUS } from 'eoffice/constants/documents';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import DeviceInfo from 'react-native-device-info';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import NavigationService from 'eoffice/utils/NavigationService';
import colors from 'eoffice/utils/colors';
import Checkbox from 'eoffice/components/Checkbox';
import Document from './Document';
import useMultyMode from './useMultyMode';
import CXLModal from '../../details/common/tablet/CXLModal';
import useModal from '../../../../utils/useModal';
import KTModal from '../../details/common/tablet/KTModal';

const styles = StyleSheet.create({
  viewContainerButton: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: DeviceInfo.isTablet() ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingBtn: {
    backgroundColor: colors.blue,
  },
  buttonComplete: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    width: variables.deviceWidth * 0.32,
  },
  btn: {
    marginRight: 4,
  },
  buttonCompleteTablet: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    width: '30%',
  },
  viewContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const Documents = ({
  documents,
  listDocuments,
  loading,
  mode,
  status,
  onDocumentPressed,
  refreshDocuments,
  total,
  countDocuments,
  countToTrinh,
  query,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);
  const [isCxl, setIsCxl] = useState(false);
  const [isKT, setisKT] = useState(false);
  const [isVisible, open, close] = useModal();
  const [state, action] = useMultyMode();
  const multyMode =
    state.multyMode && mode === DOCUMENT_TYPE.VB_DEN && status === DOC_USER_STATUS.CHO_XU_LY;

  useEffect(
    () => {
      const isToTrinh = [
        DOC_USER_STATUS.TO_TRINH_CHUA_YK,
        DOC_USER_STATUS.TO_TRINH_DCXL,
        DOC_USER_STATUS.TO_TRINH_DBL,
        DOC_USER_STATUS.TO_TRINH_CXL,
      ].includes(status);
      if (isToTrinh) {
        setCount(countToTrinh[status]);
      } else {
        setCount(total);
      }
    },
    [countToTrinh, total, status]
  );

  const onSubmit = async () => {
    if (DeviceInfo.isTablet()) {
      setIsCxl(true);
      setisKT(false);
      open();
      // await action.closeMultyMode();
    } else {
      NavigationService.navigate('Forwards', { doc: state.doc });
      await action.closeMultyMode();
    }
  };

  const submitFinish = async () => {
    if (DeviceInfo.isTablet()) {
      setisKT(true);
      setIsCxl(false);
      open();
      // await action.closeMultyMode();
    } else {
      NavigationService.navigate('Finishes', { doc: state.doc });
      await action.closeMultyMode();
    }
  };

  const [online, setOnline] = useState(true);
  return (
    <>
      <NetworkState
        visible={false}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        onConnected={() => {
          setOnline(true);
        }}
        onDisconnected={() => {
          setOnline(false);
        }}
      />
      <NavigationEvents onDidFocus={() => action.closeMultyMode()} />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.blue]}
            tintColor={colors.blue}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              refreshDocuments();
              countDocuments();
              await listDocuments();
              setRefreshing(false);
            }}
          />
        }
        data={documents}
        keyExtractor={(item, index) => `${index}`}
        ListFooterComponent={<>{!refreshing && loading && <Spinner color={colors.blue} />}</>}
        ListEmptyComponent={<>{!refreshing && !loading && <ListEmptyComponent />}</>}
        renderItem={({ item: document }) => (
          <View style={styles.viewContainer} key={`${document.id}`}>
            {multyMode && (
              <View style={styles.checkBoxContainer}>
                <TouchableOpacity
                  style={{ paddingLeft: DeviceInfo.isTablet() ? 10 : 5 }}
                  onPress={() => action.selectedCheckBox(JSON.stringify(document))}
                >
                  <Checkbox square checked={state.doc[JSON.stringify(document)]} />
                </TouchableOpacity>
              </View>
            )}
            <Document
              document={document}
              onPress={() => {
                // if (online) {
                onDocumentPressed(document, online);
                // }
              }}
              onLongPress={() => {
                // if (
                //   document.vbStepPostType !== STEP_POS_TYPE.KET_THUC &&
                //   document.vbStepPostType !== STEP_POS_TYPE.BOTH
                // ) {
                action.openMultyMode(document.vbStepId);
                // }
              }}
              mode={mode}
            />
          </View>
        )}
        onEndReached={() => {
          if (!loading && documents.length < count) {
            listDocuments();
          }
        }}
        onEndReachedThreshold={0.01}
      />
      {multyMode && (
        <View style={styles.viewContainerButton}>
          <Button
            block
            style={[
              styles.btn,
              DeviceInfo.isTablet()
                ? { width: '30%', backgroundColor: colors.lightBlue }
                : { width: variables.deviceWidth * 0.3, backgroundColor: colors.lightBlue },
              loading ? styles.loadingBtn : null,
            ]}
            onPress={onSubmit}
          >
            <Text style={[styles.btnText, { color: colors.blue }]} uppercase={false}>
              Chuyển XL
            </Text>
          </Button>
          <Button
            block
            style={[
              styles.btn,
              DeviceInfo.isTablet()
                ? { width: '30%', backgroundColor: colors.lightYellow }
                : { width: variables.deviceWidth * 0.3, backgroundColor: colors.lightYellow },
              loading ? styles.loadingBtn : null,
            ]}
            onPress={submitFinish}
          >
            <Text style={[styles.btnText, { color: colors.yellow }]} uppercase={false}>
              Kết thúc
            </Text>
          </Button>

          <Button
            style={[
              styles.btn,
              DeviceInfo.isTablet() ? styles.buttonCompleteTablet : styles.buttonComplete,
            ]}
            block
            onPress={() => action.closeMultyMode()}
          >
            <Text style={[{ color: '#ff3b30' }, styles.btnText]} uppercase={false}>
              Hủy
            </Text>
          </Button>
        </View>
      )}

      {DeviceInfo.isTablet() && isCxl && !isKT && (
        <CXLModal
          close={async () => {
            await close();
            await action.closeMultyMode();
          }}
          isVisible={isVisible}
          mode={mode}
          docUserView={state.doc}
          isCxlNhieu
        />
      )}
      {DeviceInfo.isTablet() && isKT && !isCxl && (
        <KTModal
          close={async () => {
            await close();
            await action.closeMultyMode();
          }}
          isVisible={isVisible}
          mode={mode}
          docUserView={state.doc}
          isCxlNhieu
        />
      )}
    </>
  );
};

Documents.propTypes = {
  listDocuments: PropTypes.func.isRequired,
  countDocuments: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  onDocumentPressed: PropTypes.func.isRequired,
  refreshDocuments: PropTypes.func.isRequired,

  documents: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  total: PropTypes.number,
  status: PropTypes.number,
};
Documents.defaultProps = {
  documents: [],
  loading: false,
  total: 0,
  status: null,
};

export default Documents;
