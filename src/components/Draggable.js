/* eslint-disable */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import StringWidth from 'string-width';
import PropTypes from 'prop-types';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import { IMAGE_SIZE_COMMENT } from '../constants/common';
import { Button } from 'native-base';

export default class Draggable extends Component {
  static propTypes = {
    renderText: PropTypes.string,
    renderShape: PropTypes.string,
    renderSize: PropTypes.number,
    imageSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    renderColor: PropTypes.string,
    reverse: PropTypes.bool,
    pressDrag: PropTypes.func,
    onMove: PropTypes.func,
    pressDragRelease: PropTypes.func,
    pressDragGrant: PropTypes.func,
    longPressDrag: PropTypes.func,
    pressInDrag: PropTypes.func,
    pressOutDrag: PropTypes.func,
    z: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };
  static defaultProps = {
    offsetX: 100,
    renderShape: 'circle',
    renderColor: 'yellowgreen',
    renderText: '＋',
    renderSize: 36,
    offsetY: 100,
    reverse: false,
  };

  componentWillMount() {
    if (this.props.reverse == false) this.state.pan.addListener(c => (this.state._value = c));
  }
  componentWillUnmount() {
    this.state.pan.removeAllListeners();
  }
  constructor(props, defaultProps) {
    super(props, defaultProps);
    const { pressDragRelease, reverse, onMove, pressDragGrant, scaleSize, multiLineText } = props;
    this.state = {
      pan: new Animated.ValueXY(),
      _value: {
        x: 0,
        y: 0,
      },
      posToSave: {
        x: 0,
        y: 0,
      },
    };
    const heightBox = multiLineText * 45 * scaleSize - 45;

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        if (reverse == false) {
          this.state.pan.setOffset({ x: this.state._value.x, y: this.state._value.y });
          this.state.pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { listener: onMove }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (reverse == false) {
          this.state.pan.flattenOffset();
          let canReverse = false;
          let posNow = this.getPosition();
          let x = posNow.x;
          let y = posNow.y;
          if (posNow.x < 0) {
            x = 0;
            canReverse = true;
          }
          if (variables.deviceWidth * 0.65 > scaleSize * IMAGE_SIZE_COMMENT.width) {
            if (posNow.x + scaleSize * 300 > scaleSize * IMAGE_SIZE_COMMENT.width) {
              x = scaleSize * IMAGE_SIZE_COMMENT.width;
              canReverse = true;
            }
          } else {
            if (posNow.x > variables.deviceWidth * 0.65) {
              x = variables.deviceWidth * 0.65;
              canReverse = true;
            }
          }
          if (posNow.y < 0) {
            y = 0;
            canReverse = true;
          }
          if (variables.deviceHeight * 0.82 > scaleSize * IMAGE_SIZE_COMMENT.height) {
            if (posNow.y + heightBox > scaleSize * IMAGE_SIZE_COMMENT.height) {
              canReverse = true;
              y = scaleSize * IMAGE_SIZE_COMMENT.height;
            }
          } else {
            if (posNow.y + heightBox > variables.deviceHeight * 0.82) {
              canReverse = true;
              y = variables.deviceHeight * 0.82;
            }
          }
          if (canReverse) {
            this.reverseToPosition(x, y);
          } else {
            this.state.pan.flattenOffset();
          }
        } else {
          this.reversePosition();
        }
      },
    });
  }

  _positionCss = () => {
    let Window = Dimensions.get('window');
    const { renderSize, offsetX, offsetY, x, y, z } = this.props;
    return Platform.select({
      ios: {
        zIndex: z != null ? z : 999,
        position: 'absolute',
        top: y != null ? y : Window.height / 2 - renderSize + offsetY,
        left: x != null ? x : Window.width / 2 - renderSize + offsetX,
      },
      android: {
        position: 'absolute',
        width: Window.width,
        height: Window.height,
        top: y != null ? y : Window.height / 2 - renderSize + offsetY,
        left: x != null ? x : Window.width / 2 - renderSize + offsetX,
      },
    });
  };

  _dragItemCss = () => {
    const { renderShape, renderSize, renderColor, multiLineText, scaleSize } = this.props;
    if (renderShape == 'circle') {
      return {
        backgroundColor: renderColor,
        width: renderSize * 2,
        height: renderSize * 2,
        borderRadius: renderSize,
      };
    } else if (renderShape == 'square') {
      return {
        backgroundColor: renderColor,
        width: 300 * scaleSize,
        height: multiLineText * 41 * scaleSize,
        justifyContent: 'center',
        borderRadius: 0,
      };
    } else if (renderShape == 'image') {
      return {
        width: renderSize,
        height: renderSize,
      };
    }
  };
  _dragItemTextCss = () => {
    const { renderSize, renderText, scaleSize } = this.props;
    return {
      fontSize: 29 * scaleSize,
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      flexWrap: 'wrap',
      color: 'red',
    };
  };
  _getTextOrImage = () => {
    const {
      renderSize,
      renderShape,
      renderText,
      imageSource,
      multiLineText,
      scaleSize,
    } = this.props;
    if (renderShape == 'image') {
      return <Image style={this._dragItemCss(renderSize, null, 'image')} source={imageSource} />;
    } else {
      return (
        <View
          style={{
            width: 300 * scaleSize,
            height: multiLineText * 45 * scaleSize,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={this._dragItemTextCss()}>{renderText}</Text>
        </View>
      );
    }
  };

  reversePosition = () => {
    Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
  };

  reverseToPosition = (x, y) => {
    Animated.spring(this.state.pan, { toValue: { x: 0, y: 100 } }).start();
  };

  onOk = () => {
    const { pressDragRelease } = this.props;
    let posNew = this.getPosition();
    posNew.x = posNew.x + 10;
    posNew.y = posNew.y + 10;
    pressDragRelease(null, posNew);
  };

  getPosition = () => {
    return {
      offsetX: this.state._value.x,
      offsetY: this.state._value.y,
      x: this.state._value.x + this.props.x,
      y: this.state._value.y + this.props.y,
    };
  };

  render() {
    const { pressDrag, longPressDrag, pressInDrag, pressOutDrag } = this.props;
    const touchableContent = this._getTextOrImage();

    return (
      <View style={[this._positionCss(), { position: 'absolute' }]}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), { flexDirection: 'row' }]}
        >
          <TouchableOpacity
            style={this._dragItemCss()}
            onPress={pressDrag}
            onLongPress={longPressDrag}
            onPressIn={pressInDrag}
            onPressOut={pressOutDrag}
          >
            {touchableContent}
          </TouchableOpacity>
          <Button
            onPress={() => {
              this.onOk();
            }}
            style={{ marginLeft: 10, paddingHorizontal: 7, paddingVertical: 7 }}
          >
            <Text style={{ color: 'white' }}>OK</Text>
          </Button>
        </Animated.View>
      </View>
    );
  }
}
