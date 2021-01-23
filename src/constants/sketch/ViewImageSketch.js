/* eslint-disable */
import React from 'react';
import { Image, ScrollView, Dimensions } from 'react-native';

const availableSize = ((Dimensions.get('window').width * 0.95) / 5.2) * 4.2;
export default class ViewImageSketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: props.idx,
    };
  }

  componentDidUpdate() {
    if (this.state.idx !== this.props.idx) {
      this.setState({
        idx: this.props.idx,
      });
      if (this.scrollResponderRef) {
        this.scrollResponderRef.scrollResponderZoomTo({
          x: 0,
          y: 0,
          width: 400,
          height: 400,
          animated: true,
        });
      }
    }
  }

  //
  setZoomRef = node => {
    // the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
    if (node) {
      this.zoomRef = node;
      this.scrollResponderRef = this.zoomRef.getScrollResponder();
    }
  };

  render() {
    const { imgSelect } = this.props;
    return (
      <ScrollView
        ref={this.setZoomRef}
        zoomScale={0.5}
        minimumZoomScale={0.6}
        maximumZoomScale={1}
        style={{
          alignSelf: 'center',
        }}
      >
        <Image
          source={{ uri: imgSelect.url }}
          style={{
            width: availableSize,
            height: (imgSelect.sizeImage.height * availableSize) / imgSelect.sizeImage.width,
          }}
        />
      </ScrollView>
    );
  }
}
