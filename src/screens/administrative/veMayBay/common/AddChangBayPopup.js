import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Text, Picker } from 'native-base';
import Modal from 'react-native-modal';
import { CREATE_LABELS_VE_MAY_BAY } from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import IconField from '../../common/IconField';
import DatePicker from '../../common/DatePicker';
import moment from "moment";

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 40,
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
  },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
    paddingLeft: 0,
    width: '100%',
  },
  pickerText: {
    color: '#2b2d50',
    paddingLeft: 0,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  pickerPlaceholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btmButton: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.blue,
    width: 90,
    height: 40,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  btmText: {
    alignSelf: 'center',
    color: 'white',
    justifyContent: 'center',
  }
});

const ChangBayPopup = ({
  onClose,
  visible,
  noteChangBay,
  airportsUser,
  isShowDetailChangBayItem,
  changBayItem,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [flightTimeEstimate, setFlightTimeEstimate] = useState(null);

  const [airportFromIdError, setAirportFromIdError] = useState(true);
  const [airportToIdError, setAirportToIdError] = useState(true);
  const [flightTimeEstimateError, setFlightTimeEstimateError] = useState(true);

  const [airportsList, setAirportsList] = useState([]);
  const [airportTo, setAirportTo] = useState(null);
  const [airportFrom, setAirportFrom] = useState(null);
  useEffect(
    () => {
      if (changBayItem) {
        setAirportFrom(changBayItem?.item?.airportFromId);
        setAirportTo(changBayItem?.item?.airportToId);
        setFlightTimeEstimate(changBayItem?.item?.flightTimeEstimate);
        if (changBayItem?.item?.flightTimeEstimate) {
          setFlightTimeEstimate(changBayItem?.item?.flightTimeEstimate);
        }
      } else {
        setAirportFrom(null);
        setAirportTo(null);
        setFlightTimeEstimate(null);
      }
      setAirportsList(_.values(airportsUser));
      setAirportFromIdError(true);
      setAirportToIdError(true);
      setFlightTimeEstimateError(true);
    },
    [visible]
  );
  const updateInfoChangBay = () => {
    setAirportFromIdError(airportFrom);
    setAirportToIdError(airportTo);
    setFlightTimeEstimateError(flightTimeEstimate);

    if (airportFrom === airportTo) {
      Alert.alert('Thông báo', 'Địa điểm đến và xuất phát không được trùng nhau', [{ text: 'OK' }], {
        cancelable: false,
      });
      return
    }

    if (airportFrom && airportTo && flightTimeEstimate) {
      const flightRoute = {
        airportFromId: airportFrom,
        airportToId: airportTo,
        flightTimeEstimate: flightTimeEstimate,
      };
      noteChangBay(flightRoute);
    }
  };
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6990BF', margin: 10 }}>
              {isShowDetailChangBayItem ? 'THÔNG TIN CHẶNG BAY' : 'THÊM CHẶNG BAY'}
            </Text>
            <IconField label={CREATE_LABELS_VE_MAY_BAY.fromPlace} iconName="chevrons-right" required>
              <Picker
                mode="dropdown"
                selectedValue={airportFrom?.id}
                textStyle={styles.pickerText}
                style={styles.picker}
                onValueChange={val => {
                  const newFrom = airportsList.find(d => d.id === val);
                  if (newFrom) {
                    setAirportFrom(newFrom);
                  } else {
                    setAirportFrom('');
                  }
                }}
              >
                <Picker.Item label="Chọn điểm đi" value="" color="gray" />
                {airportsList.map(item => (
                  <Picker.Item label={item.placeName} value={item.id} color="black" />
                ))}
              </Picker>
            </IconField>
            {!airportFromIdError ? (
              <Text style={{ color: 'red', paddingLeft: 15 }}>Chưa nhập địa điểm đi.</Text>
            ) : null}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.toPlace} iconName="target" required>
              <Picker
                mode="dropdown"
                selectedValue={airportTo?.id}
                textStyle={styles.pickerText}
                style={styles.picker}
                onValueChange={val => {
                  const newTo = airportsList.find(d => d.id === val);
                  if (newTo) {
                    setAirportTo(newTo);
                  } else {
                    setAirportTo('');
                  }
                }}
              >
                <Picker.Item label="Chọn điểm đến" value="" color="gray" />
                {airportsList.map(item => (
                  <Picker.Item label={item.placeName} value={item.id} color="black" />
                ))}
              </Picker>
            </IconField>
            {!airportToIdError ? (
              <Text style={{ color: 'red', paddingLeft: 15 }}>Chưa nhập địa điểm đến.</Text>
            ) : null}
            <IconField
              label={CREATE_LABELS_VE_MAY_BAY.timeRequired}
              iconName="calendar"
              required
            >
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={flightTimeEstimate}
                onChange={date => {
                  setFlightTimeEstimate(date);
                }}
              />
            </IconField>
            {!flightTimeEstimateError ? (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                Chưa nhập thời gian bay dự kiến.
              </Text>
            ) : null}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={updateInfoChangBay}
              style={styles.btmButton}
            >
              <Text style={[styles.btmText,{marginTop: 10}]}>
                Thêm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btmButton, {alignContent: 'center', backgroundColor: '#fff'}]}
            >
              <Text style={[styles.btmText,{marginTop: 8, color: 'black'}]}>
                Đóng
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

ChangBayPopup.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  isShowDetailChangBayItem: PropTypes.bool,
  airportsUser: PropTypes.objectOf,
  noteChangBay: PropTypes.objectOf,
  changBayItem: PropTypes.objectOf,
};
ChangBayPopup.defaultProps = {
  onClose() {},
  visible: false,
  airportsUser: {},
  noteChangBay: {},
  isShowDetailChangBayItem: false,
  changBayItem: null,
};

export default ChangBayPopup;
