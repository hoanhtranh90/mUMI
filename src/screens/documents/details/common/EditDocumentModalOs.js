/* eslint-disable global-require */
import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Container, Text, View, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import variables from 'eoffice/native-base-theme/variables/commonColor';

const widthS = Dimensions.get('window').width;
const heightS = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal: {
    width: variables.deviceWidth * 0.95,
    height: variables.deviceHeight * 0.95,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  field: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    width: widthS,
    height: heightS,
  },
  leftField: {
    flex: 1,
  },
  txtHeaderNote: {
    fontSize: 16,
    color: '#7a848e',
    fontWeight: 'bold',
    paddingLeft: 8,
    paddingVertical: 10,
  },
  listPagesView: {
    flex: 1,
    paddingTop: 10,
    borderTopColor: '#efeff4',
    borderTopWidth: 2,
    textAlign: 'center',
    alignContent: 'center',
  },
  txtListPage: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    borderColor: '#efeff4',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  imgListPage: {
    flex: 1,
    width: widthS,
    height: widthS + 200,
    borderColor: '#efeff4',
    borderWidth: 2,
    resizeMode: 'contain',
  },
  btnTxtCancle: {
    fontSize: 13,
    color: 'red',
    textAlign: 'right',
  },
  btnCancle: {
    paddingHorizontal: 8,
    height: 40,
    backgroundColor: '#f1f1f1',
  },
});

const EditDocumentModalOs = ({ closeModal, listImgs, listPageNumberChange }) => {
  const [imgSelect, setImgSelect] = useState(listImgs[0]);
  const [listImgsEditing] = useState(listImgs);
  const [filter, setFilter] = useState(true);
  const canvasRef = useRef();
  const reset = () => {};
  return (
    <Container style={styles.field}>
      <View style={styles.leftField}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.txtHeaderNote}>Xem chi tiết văn bản</Text>
          <Button
            block
            onPress={() => {
              reset();
              closeModal();
            }}
            style={[styles.btnCancle, { backgroundColor: 'white' }]}
          >
            <Text style={styles.btnTxtCancle} uppercase={false}>
              Đóng
            </Text>
          </Button>
        </View>
        <View style={styles.listPagesView}>
          <TouchableOpacity
            style={{ width: 150, height: 25, borderRadius: 5, backgroundColor: '#bac6d9' }}
            onPress={() => setFilter(!filter)}
          >
            <Text style={{ textAlign: 'center', lineHeight: 25 }}>
              {filter === true ? 'Tất cả văn bản' : 'Đã chỉnh sửa'}
            </Text>
          </TouchableOpacity>
          <ScrollView scrollEnabled>
            <FlatList
              scrollEnabled
              zoomScale={0.5}
              minimumZoomScale={0.5}
              maximumZoomScale={2}
              data={
                filter
                  ? listImgsEditing
                  : listImgsEditing.filter((img, index) => listPageNumberChange.includes(index))
              }
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginVertical: 10,
                    alignItems: 'center',
                    width: widthS,
                  }}
                  onPress={() => {
                    if (imgSelect !== item) {
                      if (imgSelect.opened) {
                        canvasRef.current.save();
                        setTimeout(() => {
                          const itemNew = item;
                          itemNew.opened = false;
                          setImgSelect(item);
                        }, 1500);
                      } else {
                        const itemNew = item;
                        itemNew.opened = false;
                        setImgSelect(itemNew);
                      }
                    }
                  }}
                >
                  <Image source={{ uri: item.url }} style={[styles.imgListPage]} />
                  {listPageNumberChange.includes(item.id - 1) && (
                    <Icon
                      type="Octicons"
                      name="primitive-dot"
                      style={{ color: 'red', position: 'absolute', left: 10, fontSize: 17 }}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

EditDocumentModalOs.propTypes = {
  closeModal: PropTypes.func,
  listImgs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listPageNumberChange: PropTypes.arrayOf(PropTypes.number),
};
EditDocumentModalOs.defaultProps = {
  closeModal() {},
  listPageNumberChange: [],
};

export default EditDocumentModalOs;
