import React, { useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Form,
  Icon,
  Input,
  Spinner,
  Text,
  Textarea,
  Title,
  Container,
  Content,
  Footer,
} from 'native-base';
import colors from '../../../../utils/colors';
import CustomHeader from 'eoffice/components/CustomHeader';
import IconButton from 'eoffice/components/IconButton';
import IconField from '../../common/IconField';
import { CREATE_LABELS_VE_MAY_BAY } from '../../../../constants/administrative';
import useCreateForm from '../create/useCreateForm';
import AttachmentItem from '../common/AttachmentItem';
import RoundButton from '../../common/RoundButton';
import AddCanBoFlatList from '../common/AddCanBoFlatList';
import AddChangBayFlatList from '../common/AddChangBayFlatList';
import AddCanBoPopup from '../common/AddCanBoPopup';
import AddChangBayPopup from '../common/AddChangBayPopup';
import { ATTACHMENT_TYPES } from '../../../../constants/common';
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import CreateFooter from '../create/CreateFooter';
import _ from 'lodash';
import { styles } from './StylesMayBay';
import { DocumentPickerUtil } from 'react-native-document-picker';

let indexCanBo = -1;
let indexChangBay = -1;
const CreateScreen = ({
  setIsCreate,
  positionsUser,
  airportsUser,
  departmentsUser,
  createVeMayBay,
  reloadData,
}) => {
  const [state, actions] = useCreateForm();
  const [stateFiles, actionsFiles] = useFileUploadFile(
    {
      objectType: ATTACHMENT_TYPES.TOTRINH_VEMAYBAY,
    },
    DocumentPickerUtil.pdf()
  );

  const [isShowDetailCanBoItem, setShowDetailCanBoItem] = useState(false);
  const [canBoItem, setCanBoItem] = useState({});
  const [visibleCanBo, setVisibleModalCanBo] = useState(false);

  const [changBayItem, setChangBayItem] = useState({});
  const [isShowDetailChangBayItem, setShowDetailChangBayItem] = useState(false);
  const [addChangBay, setAddChangBay] = useState(false);

  useEffect(
    () => {
      actionsFiles.reset();
    },
    [reloadData]
  );

  const showAddCanBoPopup = (isCheck, item) => {
    if (item) {
      indexCanBo = item.index;
    } else {
      indexCanBo = -1;
    }
    setCanBoItem(item);
    setShowDetailCanBoItem(isCheck);
    setVisibleModalCanBo(true);
  };

  const hideAddCanBoPopup = () => {
    setVisibleModalCanBo(false);
  };

  const noteCanBo = item => {
    hideAddCanBoPopup();
    const flightUserListTmp = state.flightUserList;
    if (indexCanBo === -1) {
      flightUserListTmp.push(item);
    } else {
      flightUserListTmp[indexCanBo] = item;
    }
    actions.setValue('flightUserList', flightUserListTmp);
  };

  const noteChangBay = item => {
    hideAddChangBayPopup();
    const flightRouteListTmp = state.flightRouteList;
    if (indexChangBay === -1) {
      flightRouteListTmp.push(item);
    } else {
      flightRouteListTmp[indexChangBay] = item;
    }
    actions.setValue('flightRouteList', flightRouteListTmp);
  };

  const showAddChangBayPopup = (isCheck, item) => {
    if (item) {
      indexChangBay = item.index;
    } else {
      indexChangBay = -1;
    }
    setChangBayItem(item);
    setShowDetailChangBayItem(isCheck);
    setAddChangBay(true);
  };

  const hideAddChangBayPopup = () => {
    setAddChangBay(false);
  };

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = async () => {
    let msg = '';
    if (!state.requestName.trim()) {
      msg = 'Chưa nhập tiêu đề yêu cầu.';
      showAlert(msg);
      return;
    }
    if (!state.requestContent.trim()) {
      msg = 'Chưa nhập nội dung yêu cầu.';
      showAlert(msg);
      return;
    }
    if (stateFiles?.files?.length === 0) {
      msg = 'Chưa có file tờ trình công tác.';
      showAlert(msg);
      return;
    }
    if (state.flightUserList.length === 0) {
      msg = 'Chưa nhập danh sách người tham gia.';
      showAlert(msg);
      return;
    }
    if (state.flightRouteList.length === 0) {
      msg = 'Chưa nhập danh sách chặng bay.';
      showAlert(msg);
      return;
    }

    if (_.isEmpty(msg)) {
      const stateTmp = state;
      const flightUserListTmp = state?.flightUserList?.map(item => {
        const flightRouteTmp = {
          userName: item?.userName,
          positionId: item?.positionId?.id,
          isdn: item?.isdn,
          identityNumber: item?.identityNumber,
          gender: item?.gender?.key,
          email: item?.email,
          deptId: item?.deptId?.id,
          bsvNumber: item?.bsvNumber,
          birthday: item?.birthday,
        };
        return flightRouteTmp;
      });
      const flightRouteListTmp = state?.flightRouteList?.map(item => {
        const flightRouteTmp = {
          airportFromId: item?.airportFromId?.id,
          airportToId: item?.airportToId?.id,
          flightTimeEstimate: item?.flightTimeEstimate,
        };
        return flightRouteTmp;
      });
      const flightFileList = stateFiles.files.map(flightFile => {
        const flightFileListTmp = {
          id: flightFile.id,
          fileName: flightFile.fileName,
          fileExtention: flightFile.fileExtention,
        };
        return flightFileListTmp;
        // }
      });
      stateTmp.flightRouteList = flightRouteListTmp;
      stateTmp.flightFileList = flightFileList;
      stateTmp.flightUserList = flightUserListTmp;

      await actions.setValue('flightFileList', stateFiles);
      createVeMayBay(stateTmp);
      actions.reset();
      setIsCreate(false);
    }
  };

  return (
    <Container>
      <CustomHeader
        Left={
          <IconButton
            icon="arrow-left"
            iconStyle={{ color: colors.gray }}
            style={styles.grayBg}
            onPress={() => {
              actions.reset();
              setIsCreate(false);
            }}
          />
        }
        Content={<Title style={styles.titleStyleContent}>Đặt vé máy bay</Title>}
        hasBorder
      />
      <Content>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Form style={styles.form}>
              <IconField label={CREATE_LABELS_VE_MAY_BAY.title} iconName="alert-circle" required>
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={state.requestName}
                  onChangeText={txt => actions.setValue('requestName', txt)}
                  style={styles.input}
                />
              </IconField>
              <IconField label={CREATE_LABELS_VE_MAY_BAY.content} iconName="alert-circle" required>
                <Textarea
                  placeholder="-"
                  rowSpan={2}
                  placeholderTextColor={colors.gray}
                  value={state.requestContent}
                  onChangeText={txt => actions.setValue('requestContent', txt)}
                  style={styles.textarea}
                />
              </IconField>
              <View style={styles.wrapBtn}>
                <IconField label={CREATE_LABELS_VE_MAY_BAY.files} iconName="file" required>
                  <View style={styles.uploadFileContainer}>
                    <IconButton
                      disabled={stateFiles.loading}
                      icon="upload"
                      iconStyle={{ color: stateFiles.loading ? colors.lightBlue : colors.blue }}
                      style={styles.btn}
                      onPress={() => {
                        actionsFiles.upload(false);
                      }}
                    />
                    {stateFiles.loading && (
                      <View style={styles.loading}>
                        <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
                        <Text style={styles.loadingText}>Đang tải file lên</Text>
                      </View>
                    )}
                    {stateFiles.files && stateFiles.files.length > 0 && (
                      <View style={{ paddingTop: 11, flex: 1 }}>
                        <FlatList
                          data={stateFiles.files}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) => (
                            <AttachmentItem
                              onRemove={() => actionsFiles.remove(item.id)}
                              item={item}
                            />
                          )}
                          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                        />
                      </View>
                    )}
                  </View>
                </IconField>
                <RoundButton
                  icon="plus-circle"
                  title="THÊM CÁN BỘ"
                  color={colors.blue}
                  titleColor="white"
                  itemSyle={styles.btnAdd}
                  onPress={() => {
                    showAddCanBoPopup(false, null);
                  }}
                />
                <AddCanBoFlatList
                  onPress={item => {
                    showAddCanBoPopup(true, item);
                  }}
                  flightUserList={state.flightUserList}
                />
                <AddCanBoPopup
                  isShowDetailCanBoItem={isShowDetailCanBoItem}
                  canBoItem={canBoItem}
                  positionsUser={positionsUser}
                  departmentsUser={departmentsUser}
                  noteCanBo={noteCanBo}
                  visible={visibleCanBo}
                  onClose={hideAddCanBoPopup}
                />
                <RoundButton
                  icon="plus-circle"
                  title="THÊM CHẶNG BAY"
                  color="#007aff"
                  titleColor="white"
                  itemSyle={styles.btnAdd}
                  onPress={() => showAddChangBayPopup(false, null)}
                />
                <AddChangBayFlatList
                  onPress={item => {
                    showAddChangBayPopup(true, item);
                  }}
                  flightRouteList={state.flightRouteList}
                />
                <AddChangBayPopup
                  isShowDetailChangBayItem={isShowDetailChangBayItem}
                  changBayItem={changBayItem}
                  airportsUser={airportsUser}
                  noteChangBay={noteChangBay}
                  visible={addChangBay}
                  onClose={hideAddChangBayPopup}
                />
              </View>
            </Form>
          </View>
        </ScrollView>
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <CreateFooter onPress={submit} />
      </Footer>
    </Container>
  );
};
export default CreateScreen;
