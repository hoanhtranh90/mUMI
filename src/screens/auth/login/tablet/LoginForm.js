/* eslint-disable global-require,import/no-unresolved */
import PropTypes from 'prop-types';
import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Form, Icon, Spinner, Text } from 'native-base';
import Input from './Input';
import useLoginForm from '../useLoginForm';

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 15,
    right: 30,
    height: 50,
    width: '60%',
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: 'rgb(0, 122, 255)',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  btnText: {
    paddingVertical: 7.5,
    fontSize: 16,
    color: '#0091ff',
    fontWeight: '600',
  },

  inputContainer: {
    width: '85%',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  wrapper: {},
  iconInput: {
    fontSize: 22,
    color: 'white',
    paddingRight: 24,
    position: 'relative',
    paddingTop: 27,
  },
  iconButton: {
    fontSize: 20,
    color: '#007aff',
    position: 'absolute',
    right: 0,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#fdfeff',
    fontWeight: 'bold',
  },
  viewInput: { flexDirection: 'row', position: 'relative', paddingHorizontal: 30 },
  form: {
    paddingTop: 20,
  },
  spinner: { position: 'absolute', right: 16 },
});

const LoginForm = ({ login, heightDecrease }) => {
  const [state, actions] = useLoginForm();
  const submit = async () => {
    actions.setSubmiting(true);
    await login({ username: state.username, password: state.password });
    actions.setSubmiting(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <Text uppercase style={[styles.text, { top: heightDecrease }]}>
        mobifone e-office
      </Text>
      <Form style={[styles.form, { top: heightDecrease }]}>
        <View style={styles.viewInput}>
          <Icon style={styles.iconInput} name="user" type="Feather" />
          <Input
            containerStyle={styles.inputContainer}
            placeholderTextColor="white"
            placeholder="Tên đăng nhập"
            value={state.username}
            onChangeText={actions.setUsername}
          />
        </View>

        <View style={styles.viewInput}>
          <Icon style={styles.iconInput} name="lock" type="Feather" />
          <Input
            containerStyle={styles.inputContainer}
            placeholderTextColor="white"
            secureTextEntry
            placeholder="Mật khẩu"
            value={state.password}
            onChangeText={actions.setPassword}
          />
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Button block style={styles.btn} onPress={submit} disabled={state.submiting}>
            <Text style={styles.btnText} uppercase={false}>
              Đăng nhập
            </Text>
            {!state.submiting && (
              <Icon name="arrow-right" type="Feather" style={styles.iconButton} />
            )}
            {state.submiting && <Spinner size="small" color="#007aff" style={styles.spinner} />}
          </Button>
        </View>
      </Form>
    </View>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  heightDecrease: PropTypes.number,
};

LoginForm.defaultProps = {
  heightDecrease: 0,
};

export default LoginForm;
