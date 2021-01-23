/* eslint-disable global-require,import/no-unresolved */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { Button, Spinner, Text, Thumbnail } from 'native-base';

import variables from 'eoffice/native-base-theme/variables/commonColor';
import { moderateScale } from 'eoffice/utils/scaling';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const { height, width } = Dimensions.get('window'); // device height and width

const standarWidth = 600;
const standardHeight = 400;
const iconWidth = variables.deviceWidth * 0.11;
const iconHeight = variables.deviceHeight * 0.15;

const styles = StyleSheet.create({
  btn: {
    height: moderateScale(30, 0.35),
    width: '100%',
    borderRadius: moderateScale(20, 0.5),
    backgroundColor: '#0091ff',
    shadowColor: '#4caaef',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnDisable: {
    height: moderateScale(30, 0.35),
    width: '100%',
    borderRadius: moderateScale(20, 0.5),
    backgroundColor: '#ecf5ff',
    opacity: 0.6,
    shadowColor: '#d9ecff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    paddingVertical: 7.5,
    fontSize: moderateScale(10, 0.5),
    color: '#fff',
    fontWeight: '600',
  },
  btnTextDisable: {
    paddingVertical: 7.5,
    fontSize: moderateScale(10, 0.5),
    color: '#8cc5ff',
    fontWeight: '600',
  },

  iconInput: {
    fontSize: moderateScale(20, 0.8),
    color: 'white',
    paddingRight: moderateScale(12, 0.5),
    position: 'relative',
    top: moderateScale(15, -0.5),
    bottom: 0,
  },
  iconButton: {
    fontSize: moderateScale(24, 0.5),
    color: '#fff',
    position: 'absolute',
    right: 0,
  },
  text: {
    alignSelf: 'center',
    fontSize: moderateScale(16, 0.5),
    color: '#fdfeff',
    fontWeight: 'bold',
  },
  textTitle: {
    alignSelf: 'center',
    fontSize: moderateScale(10, 0.5),
    color: '#2d3e4f',
    fontWeight: 'bold',
  },
  viewInput: { flexDirection: 'row', position: 'relative' },
  form: {
    paddingTop: moderateScale(25, 1),
    alignItems: 'center',
    flex: 1,
  },
  spinner: { position: 'absolute', right: 16 },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#007aff',
  },

  underlineStyleBase: {
    width: 35,
    height: 50,
    backgroundColor: '#fff',
    color: '#444444',
    fontSize: 24,
    fontWeight: 'bold',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#007aff',
  },

  input: {
    backgroundColor: '#fff',
    color: '#444444',
    fontSize: 24,
    fontWeight: 'bold',
  },

  underlineStyleHighLighted: {
    borderColor: '#007aff',
  },
  wrapper: {
    flexDirection: 'column',
    width: standarWidth,
    // height : standardHeight,
    paddingTop: 20,
    paddingBottom: 30,
    paddingRight: 30,
    paddingLeft: 30,
    shadowColor: '#111',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  appIcon: {
    width: iconWidth,
    height: iconHeight,
    top: -iconHeight / 2 - iconHeight / 5,
    position: 'absolute',
    left: standarWidth / 2 - iconWidth / 2,
  },
  textTitleWrap: {
    paddingTop: iconHeight / 5,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const OtpForm = ({ user, validateOtp, reGenerateOtp, logout }) => {
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mobileHidden, setMobileHidden] = useState('');
  const otpForm = useRef(null);

  const generateOtpFunc = () => {
    setSubmitting(true);
    reGenerateOtp().then(() => {
      setCountdown(60);
      setSubmitting(false);
    });
  };

  const reduceCountdown = () => {
    if (countdown > 0) {
      setCountdown(cd => cd - 1);
    }
  };

  useEffect(
    () => {
      if (otp && otp.length === 6) {
        setSubmitting(true);
        validateOtp({ otp: otp }).then(res => {
          otpForm.current.state.digits = [];
          setOtp('');
          setSubmitting(false);
          Keyboard.dismiss();
        });
      }
    },
    [otp]
  );

  useEffect(
    () => {
      if (user && user.mobile) {
        const mobile = user.mobile;
        let isdnWithMask = '';
        let length = mobile.length;
        for (let index = 0; index < length; index++) {
          isdnWithMask += index <= 2 || index >= length - 3 ? mobile[index] : '*';
        }
        setMobileHidden(isdnWithMask);
      }
    },
    [user]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      reduceCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Thumbnail source={require('eoffice/assets/app-icon.png')} style={styles.appIcon} />
      <View style={styles.textTitleWrap}>
        <Text style={styles.textTitle}>Xác thực OTP</Text>
      </View>
      <View style={{ marginTop: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>
            Mã xác thực OTP đã được gửi tới số điện thoại {mobileHidden}.
          </Text>
          <Text style={{ fontStyle: 'italic' }}>
            (Trong trường hợp số điện thoại đăng ký sử dụng hệ thống E-Office không phải số điện
            thoại Mạng MobiFone, liên hệ quản trị đơn vị để thay đổi.)
          </Text>
          <OTPInputView
            ref={otpForm}
            style={{ height: 100, width: '100%' }}
            pinCount={6}
            onCodeChanged={code => setOtp(code)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              setOtp(code);
            }}
          />
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginTop: 20 }}>
          {(submitting || countdown > 0) && (
            <Button block style={styles.btnDisable} onPress={generateOtpFunc} disabled>
              <Text style={styles.btnTextDisable} uppercase={false}>
                Mã có hiệu lực trong {countdown} (giây)
              </Text>
              {submitting && <Spinner size="small" color="#fff" style={styles.spinner} />}
            </Button>
          )}
          {!(submitting || countdown > 0) && (
            <Button block style={styles.btn} onPress={generateOtpFunc}>
              <Text style={styles.btnText} uppercase={false}>
                Gửi lại mã
              </Text>
              {submitting && <Spinner size="small" color="#fff" style={styles.spinner} />}
            </Button>
          )}
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#2c92ff' }} onPress={() => logout()}>
              Đăng nhập tài khoản khác
            </Text>
          </View>
        </View>
      </View>
      {/*<Text uppercase style={styles.textTitle}>*/}
      {/*  xác thực otp*/}
      {/*</Text>*/}
      {/*<Form style={styles.form}>*/}
      {/*  <View>*/}
      {/*    <Text>Mã xác thực OTP đã được gửi tới số điện thoại </Text>*/}
      {/*    <Text style={{ fontWeight: 'bold' }}>+8496*****96</Text>*/}
      {/*    /!*<Text>(Trong trường hợp số điện thoại không phải là số điện thoại của mạng MobiFone, hãy liên hệ quản trị để thay đổi.)</Text>*!/*/}
      {/*  </View>*/}
      {/*  <View style={{ alignItems: 'center', flexDirection: 'row' }}>*/}
      {/*    /!*<Input*!/*/}
      {/*    /!*  placeholder="000000"*!/*/}
      {/*    /!*  placeholderTextColor={colors.gray}*!/*/}
      {/*    /!*  style={styles.input}*!/*/}
      {/*    /!*  value={otp}*!/*/}
      {/*    /!*  onChangeText={setOtp}*!/*/}
      {/*    /!*/
      /*/}
      {/*    <OTPInputView*/}
      {/*      ref={otpForm}*/}
      {/*      style={{ height: 200, width: '90%' }}*/}
      {/*      pinCount={6}*/}
      {/*      // code={this.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.*/}
      {/*      onCodeChanged={code => setOtp(code)}*/}
      {/*      autoFocusOnLoad*/}
      {/*      codeInputFieldStyle={styles.underlineStyleBase}*/}
      {/*      codeInputHighlightStyle={styles.underlineStyleHighLighted}*/}
      {/*      onCodeFilled={code => {*/}
      {/*        setOtp(code);*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*  <View>*/}
      {/*    <Button*/}
      {/*      block*/}
      {/*      style={submitting || countdown > 0 ? styles.btnDisable : styles.btn}*/}
      {/*      onPress={generateOtpFunc}*/}
      {/*      disabled={submitting || countdown > 0}*/}
      {/*    >*/}
      {/*      <Text style={styles.btnText} uppercase={false}>*/}
      {/*        Gửi lại mã*/}
      {/*      </Text>*/}
      {/*      {!submitting && countdown > 0 && <Text style={{ color: '#fff' }}>{countdown}</Text>}*/}
      {/*      {submitting && <Spinner size="small" color="#fff" style={styles.spinner} />}*/}
      {/*    </Button>*/}
      {/*    <View style={{ marginTop: 20, alignItems: 'center' }}>*/}
      {/*      <Text style={{ color: '#2c92ff' }} onPress={() => logout()}>*/}
      {/*        Đăng nhập tài khoản khác*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Form>*/}
    </View>
  );
};

OtpForm.propTypes = {
  reGenerateOtp: PropTypes.func.isRequired,
  validateOtp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default OtpForm;
