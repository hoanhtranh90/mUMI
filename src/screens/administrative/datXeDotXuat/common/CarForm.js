import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Alert, Linking, Platform } from 'react-native';
import { Form, Input, Textarea, Icon, Button, Text } from 'native-base';
import {
  CREATE_LABELS_DAT_XE,
  HANHCHINH_TYPE,
  REQUEST_TYPE,
  // FLOW_INFO,
} from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import Picker from 'eoffice/components/Picker';
import _ from 'lodash';
import styles from './CarForm.style';
import DatePicker from '../../common/DatePicker';
import IconField from '../../common/IconField';
import RoundButton from '../../common/RoundButton';
// import Utilities from '../../common/Utilities.container';

const CarForm = ({
  setValue,
  state,
  type,
  listFreeCars,
  listDrivers,
  hcCaseDieuXe,
  currentListCarAndDriver,
  actionList,
}) => {
  const [driverList, setDriverList] = useState([]);
  const [carList, setCarList] = useState([]);
  const [carAndDriverList, setCarAndDriverList] = useState([]);

  async function getListFreeCarsAndDrivers(startTime, endTime) {
    const drivers = await listDrivers();
    setDriverList(drivers.listDriver);
    const freeCars = await listFreeCars({ startTime, endTime });

    if (!_.isEmpty(currentListCarAndDriver)) {
      _.forEach(currentListCarAndDriver, obj => {
        const car = {};
        car.id = obj.carId;
        car.manufacturer = obj.manufacturer;
        car.licencePlate = obj.licencePlate;
        car.driverId = obj.driverId;
        freeCars.dataCarFree.push(car);
      });
    }
    setCarList(freeCars.dataCarFree);

    if (!_.isEmpty(currentListCarAndDriver)) {
      _.forEach(currentListCarAndDriver, obj => {
        const carDriver = {};

        _.forEach(freeCars.dataCarFree, obj2 => {
          if (obj.carId === obj2.id) {
            carDriver.carSelected = obj2;
          }
        });

        _.forEach(drivers.listDriver, obj2 => {
          if (obj.driverId === obj2.id) {
            carDriver.driverSelected = obj2;
          }
        });

        carAndDriverList.push(carDriver);
      });
      setCarAndDriverList(carAndDriverList);
      setValue('carAndDriverSelected', carAndDriverList);
    }
  }

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  function fillDataForm() {
    setValue('title', hcCaseDieuXe.title);
    setValue('content', hcCaseDieuXe.description);
    setValue('startTime', new Date(hcCaseDieuXe.startTime));
    setValue('endTime', new Date(hcCaseDieuXe.endTime));
    setValue('fromPlace', hcCaseDieuXe.fromPlace);
    setValue('toPlace', hcCaseDieuXe.toPlace);
    setValue('numberOfPeople', `${hcCaseDieuXe.numberOfPeople}`);
    setValue('contactNumber', hcCaseDieuXe.contactNumber);
    if (!_.isNull(hcCaseDieuXe.note)) {
      setValue('note', hcCaseDieuXe.note);
    }
    _.forEach(REQUEST_TYPE, obj => {
      if (obj.value === hcCaseDieuXe.requestType) {
        setValue('requestType', obj);
      }
    });
  }

  function makeCall(phoneNumber) {
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  }
  function addCarAndDriver() {
    if (!_.isEmpty(carList)) {
      let carDriverObject = {};
      carDriverObject = {
        ...carDriverObject,
        carSelected: carList[carAndDriverList.length],
      };
      _.forEach(driverList, obj => {
        if (obj.id === carList[carAndDriverList.length].driverId) {
          carDriverObject = {
            ...carDriverObject,
            driverSelected: obj,
          };
        }
      });

      carAndDriverList.push(carDriverObject);
      setCarAndDriverList(carAndDriverList);
      setValue('carAndDriverSelected', carAndDriverList);
    } else {
      showAlert(
        'Không có danh sách xe rảnh trong khoảng thời gian. Vui lòng chọn khoảng thời gian khác.'
      );
    }
  }

  function changeCar(list, i, car) {
    const arr = list;
    arr[i].carSelected = car;

    _.forEach(driverList, obj => {
      if (obj.id === car.driverId) {
        arr[i].driverSelected = obj;
      }
    });

    setCarAndDriverList(arr);
    setValue('carAndDriverSelected', arr);
  }

  function changeDriver(list, i, driver) {
    const arr = list;
    arr[i].driverSelected = driver;
    setCarAndDriverList(arr);
    setValue('carAndDriverSelected', arr);
  }

  function removeCarDriver(data) {
    const arr = carAndDriverList.filter(item => item !== data);
    setCarAndDriverList(arr);
    setValue('carAndDriverSelected', arr);
  }

  function onChangeStartDate(date) {
    setValue('startTime', date);

    if (!_.isNull(date) && !_.isNull(state.endTime)) {
      getListFreeCarsAndDrivers(date.getTime(), state.endTime.getTime());
    }
  }

  function onChangeEndDate(date) {
    setValue('endTime', date);

    if (!_.isNull(state.startTime) && !_.isNull(date)) {
      getListFreeCarsAndDrivers(state.startTime.getTime(), date.getTime());
    }
  }

  useEffect(() => {
    if (type === HANHCHINH_TYPE.DETAIL) {
      fillDataForm();
      getListFreeCarsAndDrivers(hcCaseDieuXe.startTime, hcCaseDieuXe.endTime);
    }
  }, []);

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Form style={styles.form}>
            <IconField label={CREATE_LABELS_DAT_XE.requestType} iconName="book" required>
              <Picker
                mode="dropdown"
                iosIcon={selectIcon}
                style={styles.picker}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                textStyle={styles.pickerText}
                selectedValue={state.requestType}
                onValueChange={val => setValue('requestType', val)}
                enabled={type === HANHCHINH_TYPE.CREATE}
                items={REQUEST_TYPE.map(data => ({
                  label: data.text,
                  value: data,
                }))}
              />
            </IconField>
            <IconField label={CREATE_LABELS_DAT_XE.title} iconName="alert-circle" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.title}
                onChangeText={txt => setValue('title', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.input}
              />
            </IconField>
            <IconField label={CREATE_LABELS_DAT_XE.content} iconName="alert-circle" required>
              <Textarea
                placeholder="-"
                rowSpan={4}
                placeholderTextColor={colors.gray}
                value={state.content}
                onChangeText={txt => setValue('content', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.textarea}
              />
            </IconField>

            <IconField label={CREATE_LABELS_DAT_XE.numberOfPeople} iconName="users" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.numberOfPeople}
                onChangeText={txt => setValue('numberOfPeople', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                keyboardType="number-pad"
                style={styles.input}
              />
            </IconField>

            <IconField label={CREATE_LABELS_DAT_XE.contactNumber} iconName="phone-call">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.contactNumber}
                onChangeText={txt => setValue('contactNumber', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </IconField>

            <IconField label={CREATE_LABELS_DAT_XE.fromPlace} iconName="layout" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.fromPlace}
                onChangeText={txt => setValue('fromPlace', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.input}
              />
            </IconField>

            <IconField label={CREATE_LABELS_DAT_XE.toPlace} iconName="layout" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.toPlace}
                onChangeText={txt => setValue('toPlace', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.input}
              />
            </IconField>

            <IconField label={CREATE_LABELS_DAT_XE.startTime} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.startTime}
                onChange={date => onChangeStartDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
              />
            </IconField>
            <IconField label={CREATE_LABELS_DAT_XE.endTime} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.endTime}
                onChange={date => onChangeEndDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
              />
            </IconField>
            {(type === HANHCHINH_TYPE.CREATE ||
              (type === HANHCHINH_TYPE.DETAIL && actionList.length !== 0)) && (
              <View style={styles.wrapBtn}>
                <RoundButton
                  icon="plus-circle"
                  title="THÊM XE"
                  color="#007aff"
                  titleColor="white"
                  itemSyle={{ width: 130 }}
                  onPress={() => addCarAndDriver()}
                />
              </View>
            )}

            {carAndDriverList.map((dataObj, index) => (
              <View key={index.toString()} style={styles.wrapRowCarDriver}>
                <View style={styles.rowCarDriver}>
                  <View>
                    <IconField label={CREATE_LABELS_DAT_XE.selectCar} iconName="truck">
                      <Picker
                        mode="dropdown"
                        iosIcon={selectIcon}
                        style={styles.picker}
                        placeholder="-"
                        placeholderStyle={styles.pickerPlaceholder}
                        textStyle={styles.pickerText}
                        selectedValue={dataObj.carSelected}
                        onValueChange={val => changeCar(carAndDriverList, index, val)}
                        items={carList.map(data => ({
                          label: `${data.manufacturer} ${data.licencePlate}`,
                          value: data,
                        }))}
                      />
                    </IconField>
                  </View>
                  <View>
                    <IconField label={CREATE_LABELS_DAT_XE.selectDriver} iconName="user">
                      <Picker
                        mode="dropdown"
                        iosIcon={selectIcon}
                        style={styles.picker}
                        placeholder="-"
                        placeholderStyle={styles.pickerPlaceholder}
                        textStyle={styles.pickerText}
                        selectedValue={dataObj.driverSelected}
                        onValueChange={val => changeDriver(carAndDriverList, index, val)}
                        items={driverList.map(data => ({
                          label: data.fullName,
                          value: data,
                        }))}
                      />
                    </IconField>
                  </View>
                </View>
                {actionList.length !== 0 && (
                  <View
                    style={{
                      marginVertical: 5,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      transparent
                      onPress={() => {
                        makeCall(dataObj.driverSelected.mobile);
                      }}
                    >
                      <Text>Gọi điện</Text>
                    </Button>
                    <Button transparent danger onPress={() => removeCarDriver(dataObj)}>
                      <Text>Xoá</Text>
                    </Button>
                  </View>
                )}
                {actionList.length === 0 && (
                  <View
                    style={{
                      marginVertical: 5,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      transparent
                      onPress={() => {
                        makeCall(dataObj.driverSelected.mobile);
                      }}
                    >
                      <Text>Gọi điện</Text>
                    </Button>
                  </View>
                )}
              </View>
            ))}

            {type === HANHCHINH_TYPE.CREATE && (
              <IconField label={CREATE_LABELS_DAT_XE.note} iconName="file" required>
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={state.note}
                  onChangeText={txt => setValue('note', txt)}
                />
              </IconField>
            )}

            {type === HANHCHINH_TYPE.DETAIL && (
              <IconField label={CREATE_LABELS_DAT_XE.note} iconName="file" required>
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  value={state.note}
                  onChangeText={txt => setValue('note', txt)}
                  disabled={actionList.length === 0}
                />
              </IconField>
            )}

            {/* <Utilities state={state} flowCode={FLOW_INFO.DIEU_XE_DX} /> */}
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

CarForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  type: PropTypes.number,
  listFreeCars: PropTypes.func,
  listDrivers: PropTypes.func,
  hcCaseDieuXe: PropTypes.shape({}),
  currentListCarAndDriver: PropTypes.arrayOf(PropTypes.shape({})),
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
};
CarForm.defaultProps = {
  setValue() {},
  state: {},
  type: HANHCHINH_TYPE.CREATE,
  listFreeCars() {},
  listDrivers() {},
  hcCaseDieuXe: {},
  currentListCarAndDriver: [],
  actionList: [],
};

export default CarForm;
