import React, { useEffect, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, FlatList } from 'react-native';
import { Footer, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { formatQuery } from 'eoffice/utils/utils';
import { endOfWeek, startOfWeek, addDays, startOfDay } from 'date-fns';
import { FLOW_INFO } from '../../../../constants/administrative';
import Header from './SummaryHeader';
import SummaryFooter from './SummaryFooter';
import Summary from './Summary.container';
import Utilities from '../../common/Utilities.container';
import axios from 'eoffice/store/axios';
import RoundButton from '../../../administrative/common/RoundButton';
import { da } from 'date-fns/locale';
import store from '../../../../store/index';
import { actions as summaryActions } from 'eoffice/store/administrative/summary';
import Modal from 'react-native-modal';

const SummaryScreen = ({ navigation, hcFlow, getFlowsCanStart, getFlowsAvailable }) => {
  const { width, height } = Dimensions.get('window');
  const [isVisible, setVisible] = useState(false);
  const [isVisibleAddLT, setVisibleAddLT] = useState(false);
  const [isViewLTOther, setIsViewLTOther] = useState(false);
  const [listAvailable, setListAvailable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lt, setLt] = useState('');

  const now = startOfDay(new Date());
  const param = {
    startDate: startOfWeek(now, { weekStartsOn: 0 }),
    endDate: endOfWeek(now, { weekStartsOn: 0 }),
    startTime: startOfWeek(now, { weekStartsOn: 0 }),
    endTime: endOfWeek(now, { weekStartsOn: 0 }),
  };

  function getFlowInf() {
    if (!_.isUndefined(hcFlow.id)) {
      setVisible(true);
    }
  }
  useEffect(() => {
    getFlowInf();
    if (hcFlow.flowCode == FLOW_INFO.LICH_TUAN) {
      getFlowsCanStart(FLOW_INFO.LICH_TUAN);
      getFlowsAvailable(FLOW_INFO.LICH_TUAN);

      axios.get('/hanhchinh/getFlowsCanStart?flowCode=LICH_TUAN').then(res => {
        if (res.data.hcFlows.length > 0) {
          setVisibleAddLT(true);
        }
      });

      axios.get('/hanhchinh/getFlowsAvailable?flowCode=LICH_TUAN').then(res => {
        if (res.data.hcFlows.length >= 1) {
          setIsViewLTOther(true);
          setListAvailable([...res.data.hcFlows, { id: 0, deptName: 'Lịch tuần được chia sẻ', deptId : 0 }]);
          setLt('Lịch tuần ' + res.data.hcFlows[0].deptName);
        }
      });
    }
  }, []);

  onSelect = (deptId, deptName) => {
    global.selectDeptForViewLT = deptId;
    setLt(deptName);
    const param = {
      mode: 2,
      flow: FLOW_INFO.LICH_TUAN,
    };
    store.dispatch(summaryActions.changeModeLT(param));
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} hcFlow={hcFlow} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {hcFlow.flowCode === FLOW_INFO.LICH_TUAN && listAvailable.length > 1 && (
          <Text style={{ marginLeft: 15, marginTop: 10, fontSize: 15, alignSelf: 'center' }}>
            {lt}
          </Text>
        )}

        <Modal
          onBackdropPress={() => {
            setShowModal(false);
          }}
          isVisible={showModal}
          style={{
            borderRadius: 10,
            flex: 0,
            marginLeft: width * 0.05,
            marginRight: width * 0.05,
            width: width * 0.9,
            height: listAvailable.length < 4 ? listAvailable.length * 80 + 30 : 320,
            marginTop:
              listAvailable.length < 4
                ? (height - listAvailable.length * 80 - 80) / 2
                : (height - 400) / 2,
            // marginBottom: height * 0.4,
            backgroundColor: '#ffffff',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={listAvailable}
              extraData={listAvailable}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: width * 0.85,
                    // alignSelf: 'baseline',
                    height: 70,
                    borderRadius: 10,
                    borderColor: '#007aff',
                    borderWidth: 0.5,
                  }}
                  onPress={() => {
                    setShowModal(false);
                    global.selectDeptForViewLT = item.deptId;
                    setLt(`${item.deptId !== 0 ? 'Lịch tuần' : ''} ${item.deptName}` );
                    const param = {
                      mode: 2,
                      flow: FLOW_INFO.LICH_TUAN,
                      onlyShared : item.deptId === 0
                    };
                    store.dispatch(summaryActions.changeModeLT(param));
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 12,
                      fontSize: 16,
                      color: 'black',
                      alignSelf: 'center',
                    }}
                  >
                    {item.deptName}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </Modal>
        <Summary navigation={navigation} />
        {isViewLTOther && (
          <Button
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: 48,
              height: 48,
              right: 30,
              borderRadius: 24,
              bottom: 20,
              backgroundColor: '#007aff',
            }}
            onPress={() => {
              // navigation.navigate('SelectDeptLT', {
              //   listAvailable: listAvailable,
              //   onSelect: this.onSelect,
              // });
              setShowModal(true);
            }}
          >
            <Icon
              name="calendar"
              type="Feather"
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: 'white',
              }}
            />
          </Button>
        )}
      </View>

      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        {hcFlow.flowCode !== FLOW_INFO.LICH_TUAN && (
          <View style={{ flexDirection: 'row' }}>
            {isVisible && <SummaryFooter navigation={navigation} hcFlow={hcFlow} />}
            <Utilities state={formatQuery(param)} flowCode={hcFlow.flowCode} />
          </View>
        )}

        {hcFlow.flowCode === FLOW_INFO.LICH_TUAN && (
          <View style={{ flexDirection: 'row' }}>
            {isVisibleAddLT && <SummaryFooter navigation={navigation} hcFlow={hcFlow} />}
            {/* {isViewLTOther && (
              <View style={{ marginLeft: 15 }}>
                <RoundButton
                  icon="calendar"
                  title="Xem thêm"
                  color="#007aff"
                  titleColor="white"
                  onPress={() => {
                    navigation.navigate('SelectDeptLT', {
                      listAvailable: listAvailable,
                      onSelect: this.onSelect,
                    });
                  }}
                />
              </View>
            )} */}
          </View>
        )}
      </Footer>
    </View>
  );
};

SummaryScreen.propTypes = {
  hcFlow: PropTypes.shape({}).isRequired,
};
SummaryScreen.defaultProps = {};

export default SummaryScreen;
