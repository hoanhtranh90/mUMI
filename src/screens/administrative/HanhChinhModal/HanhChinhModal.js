import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Dimensions, StatusBar, Platform, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import NavigationService from 'eoffice/utils/NavigationService';
import AdministrativeItem from './AdministrativeItem';
import axios from 'eoffice/store/axios';
import DeviceInfo from 'react-native-device-info'
const { height } = Dimensions.get('window');
import Assets from 'eoffice/assets';

const styles = StyleSheet.create({
  // modal style
  modalContent: {
    height: height / 2,
    backgroundColor: 'white',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  titleModal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d3e4f',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
});

const HanhChinhModal = ({ onModalItemPress, menuHanhChinh, getMenuItemConfig}) => {
   const [visible, setVisible] = useState(true);

   useEffect(() => {
     if (DeviceInfo.isTablet()) {
       getMenuItemConfig()
     }
   }, [])

   useEffect(() => {
     console.log(menuHanhChinh)
   }, [menuHanhChinh])



   async function getListCreateLichTuan(data) {
      // Lay danh sach  co the tao lich tuan
     if (data[0].flowCode === 'LICH_TUAN') {
       await axios
         .get('/hanhchinh/getFlowsAvailable?flowCode=LICH_TUAN')
         .then(res => {
           if (res.data.hcFlows.length > 0) {
             global.deptId = res.data.hcFlows[0].deptId;
           } else {
             global.deptId = '';
           }
         });
     }

     global.selectDeptForViewLT = '';
     global.deptSelected = '';
     await onModalItemPress(data[0]);
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.bottomModal}
      onBackdropPress={() => {
        setVisible(false);
        NavigationService.goBack();
      }}
      onBackButtonPress={() => {
        setVisible(false);
        NavigationService.goBack();
      }}
    >
      {Platform.OS === 'android' ? <StatusBar backgroundColor="rgba(0,0,0,0.5)" /> : null}

      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>Mời chọn quy trình</Text>
        <ScrollView>
          {menuHanhChinh &&
            menuHanhChinh.map((data, index) => {
              if (data[0]) {
                return (
                  <AdministrativeItem
                    icon={data[0].icon}
                    key={index.toString()}
                    title={data[0].title}
                    onPress={() => {
                       getListCreateLichTuan(data)
                    }}
                  />
                );
              }
              return null;
            })}

          {/*<AdministrativeItem*/}
          {/*  icon={Assets.phongHop}*/}
          {/*  key={5}*/}
          {/*  title={'Gửi yêu cầu'}*/}
          {/*  onPress={async () => {*/}
          {/*    NavigationService.navigate('RequestSupport');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<AdministrativeItem*/}
          {/*  icon={Assets.phongHop}*/}
          {/*  key={9}*/}
          {/*  title={'Đặt phòng khách sạn'}*/}
          {/*  onPress={async () => {*/}
          {/*    NavigationService.navigate('BookHotel');*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<AdministrativeItem*/}
          {/*  icon={Assets.phongHop}*/}
          {/*  key={10}*/}
          {/*  title={'Văn Phòng Phẩm'}*/}
          {/*  onPress={async () => {*/}
          {/*    NavigationService.navigate('VanPhongPham');*/}
          {/*  }}*/}
          {/*/>*/}
        </ScrollView>
      </View>
    </Modal>
  );
};

HanhChinhModal.propTypes = {
  onModalItemPress: PropTypes.func.isRequired,
  menuHanhChinh: PropTypes.arrayOf(PropTypes.shape({})),
};
HanhChinhModal.defaultProps = {
  menuHanhChinh: [],
};

export default HanhChinhModal;
