/* eslint-disable global-require */
import React, { useState, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { Container, Text, View, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { formatTextEdit } from 'eoffice/utils/utils';
import RNSketchCanvas, { SketchCanvas } from 'eoffice/constants/sketch';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import * as DocumentNavigation from '../../../../../utils/DocumentNavigation';

import TuChoiContainer from '../DocumentActions/TuChoi.container';
import Draggable from '../../../../../components/Draggable';
import ViewImageSketch from '../../../../../constants/sketch/ViewImageSketch';

const availableSize = Number.parseInt(((Dimensions.get('window').width * 0.95) / 5.2) * 4.2);

const styles = StyleSheet.create({
  modal: {
    width: variables.deviceWidth * 0.95,
    height: variables.deviceHeight * 0.95,
    marginHorizontal: variables.deviceWidth * 0.025,
    marginVertical: variables.deviceHeight * 0.025,
  },
  field: { backgroundColor: 'white', flex: 1, flexDirection: 'row' },
  functionButton: {
    position: 'absolute',
    backgroundColor: 'rgba(3, 2, 2, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 2,
    right: 30,
    zIndex: 1000,
  },
  leftField: {
    flex: 1,
    borderColor: '#efeff4',
    borderWidth: 2,
  },
  fieldCanvas: { flex: 4.2, backgroundColor: '#f8f9fd' },
  txtHeaderNote: {
    fontSize: 16,
    color: '#7a848e',
    fontWeight: 'bold',
    paddingLeft: 8,
    paddingVertical: 10,
  },
  allPageView: {
    backgroundColor: '#efeff4',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  allPageText: {
    paddingLeft: 8,
    color: '#abb4bd',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listPagesView: {
    flex: 1,
    paddingTop: 10,
    borderTopColor: '#efeff4',
    borderTopWidth: 2,
  },
  viewEditable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  btnAddText: {
    backgroundColor: 'rgba(3, 2, 2, 0.6)',
    position: 'absolute',
    right: 31,
    top: 120,
    zIndex: 1000,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAllowScroll: {
    backgroundColor: 'rgba(3, 2, 2, 0.6)',
    position: 'absolute',
    right: 31,
    top: 170,
    zIndex: 1000,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: { backgroundColor: 'transparent', flex: 1 },
  canvasStyle: {
    backgroundColor: '#000000',
    borderColor: 'black',
    borderWidth: 1,
  },
  inputField: {
    position: 'absolute',
    zIndex: 1000,
    left: 200,
    top: 40,
    flexDirection: 'row',
  },
  txtInput: {
    color: 'red',
    fontSize: 29,
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 300,
    backgroundColor: 'rgba(255, 247, 0, 0.9)',
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
    width: 150,
    height: 100,
    borderColor: '#efeff4',
    borderWidth: 2,
  },
  btnText: {
    fontSize: 13,
  },
  btnTxtCancle: {
    fontSize: 13,
    color: 'black',
  },
  btnResend: {
    paddingHorizontal: 30,
    marginLeft: 10,
    height: 40,
  },
  btnCancle: {
    paddingHorizontal: 8,
    marginLeft: 10,
    height: 40,
    backgroundColor: '#f1f1f1',
  },
  iconEdit: {
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

const EditDocumentModal = ({
  closeModal,
  listImgs,
  documentId,
  listImgDefault,
  listPageNumberChange,
}) => {
  const [texts, setTexts] = useState([]);
  const [textEditing, setTextEditing] = useState('');
  const [actions, setActions] = useState([]);
  const [posTextToAdd, setPosTextToAdd] = useState({
    x: 0,
    y: 0,
  });
  const [showInput, setShowInput] = useState(false);
  const [showDrag, setShowDrag] = useState(false);
  const [imgSelect, setImgSelect] = useState(listImgs[0]);
  const [listImgsEditing, setListImgEditing] = useState(listImgs);
  const [nativeEventDrag, setNativeEventDrag] = useState({
    x: 0,
    y: 0,
    zoomScale: 1,
  });
  const [editable, setEditable] = useState(false);
  const [scrollRef, setScrollRef] = useState(null)
  const [showView, setShowView] = useState(true)
  const canvasRef = useRef();
  const addText = () => {
    if (showInput === true) {
      setShowInput(false);
    } else {
      const text = {
        text: '',
        fontSize: 30,
        position: { x: posTextToAdd.x, y: posTextToAdd.y },
        coordinate: 'Ratio',
        overlay: 'SketchOnText',
        fontColor: 'red',
        alignment: 'Left',
        lineHeightMultiple: 1,
      };
      const textsArr = texts;
      textsArr.push(text);
      setTexts(textsArr);
      setTextEditing('');
      setShowInput(true);
    }
  };

  const onChangeText = text => {
    if (showInput) {
      setTextEditing(text);
    }
  };

  const onSketchSaved = (success, path) => {
    if (success) {
      const arrImgs = [...listImgsEditing];
      const idx = arrImgs.findIndex(ele => ele.id === imgSelect.id);
      arrImgs[idx].url = path;
      arrImgs[idx].edited = true;
      setListImgEditing(arrImgs);
      setTexts([]);
      setTextEditing('');
      setActions([]);
      setPosTextToAdd({
        x: 0,
        y: 0,
      });
      setShowInput(false);
      setShowDrag(false);
    } else {
      const arrImgs = [...listImgsEditing];
      setListImgEditing(arrImgs);
      setTexts([]);
      setTextEditing([]);
      setActions([]);
      setPosTextToAdd({
        x: 0,
        y: 0,
      });
      setShowInput(false);
      setShowDrag(false);
    }
  };

  const pressDragReleaseModal = (e, gestureState) => {
    const textsArr = texts;
    if (textsArr.length > 0) {
      const position = {
        x: 0,
        y: 0,
      };
      position.x =
        (gestureState.x + nativeEventDrag.x) /
        (nativeEventDrag.zoomScale * imgSelect.sizeImage.width);
      position.y =
        (gestureState.y + nativeEventDrag.y) /
        (nativeEventDrag.zoomScale * imgSelect.sizeImage.height);
      const text = {
        text: formatTextEdit(textEditing),
        fontSize: 30,
        position,
        anchor: { x: 0, y: 0 },
        coordinate: 'Ratio',
        overlay: 'SketchOnText',
        fontColor: 'red',
        alignment: 'Left',
      };
      textsArr[textsArr.length - 1] = text;
    }
    setTexts(textsArr);
    setPosTextToAdd({
      x: 0,
      y: 0,
    });
    setShowDrag(false);
    setActions([...actions, 1]);
    const arrImgs = [...listImgsEditing];
    const idx = arrImgs.findIndex(ele => ele.id === imgSelect.id);
    if (arrImgs[idx].opened !== true) {
      arrImgs[idx].edited = true;
      arrImgs[idx].opened = true;
      setListImgEditing(arrImgs);
    }
  };
  const reset = () => {
    setListImgEditing(listImgDefault);
    if (documentId !== '') setImgSelect(listImgDefault[0]);
    setTexts([]);
    setTextEditing([]);
    setActions([]);
    setPosTextToAdd({
      x: 0,
      y: 0,
    });
    setShowInput(false);
    setShowDrag(false);
  };

  return (
    <Container style={styles.field}>
      <View style={styles.leftField}>
        <Text style={styles.txtHeaderNote}>Ghi chú văn bản</Text>
        <View style={styles.listPagesView}>
          <FlatList
            data={listImgsEditing}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginVertical: 10, alignItems: 'center' }}
                onPress={() => {
                  if (imgSelect !== item) {
                    if (imgSelect.opened) {
                      canvasRef.current.save();
                      setTimeout(() => {
                        const itemNew = item;
                        itemNew.opened = false;
                        setImgSelect(item);
                        onSketchSaved(false);
                      }, 1500);
                    } else {
                      const itemNew = item;
                      itemNew.opened = false;
                      setImgSelect(itemNew);
                      onSketchSaved(false);
                    }
                  }
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.imgListPage,
                    {
                      borderColor: imgSelect.id === item.id ? '#007aff' : '#efeff4',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.txtListPage,
                    {
                      borderColor: imgSelect.id === item.id ? '#007aff' : '#efeff4',
                    },
                  ]}
                >
                  Trang {item.id === 0 ? 'Ký số' : item.id}
                </Text>
                {item.edited === true && (
                  <Icon
                    type="Octicons"
                    name="primitive-dot"
                    style={{
                      color: 'red',
                      position: 'absolute',
                      right: 25,
                      fontSize: 17,
                    }}
                  />
                )}
                {listPageNumberChange.includes(item.id - 1) && (
                  <Icon
                    type="Octicons"
                    name="primitive-dot"
                    style={{
                      color: 'red',
                      position: 'absolute',
                      right: 25,
                      fontSize: 17,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={styles.fieldCanvas}>
        <View
          style={{
            position: 'absolute',
            paddingLeft: 8,
            paddingTop: 8,
            zIndex: 1000,
          }}
        >
          <Text>Trang {imgSelect.id === 0 ? 'Ký số' : imgSelect.id}</Text>
        </View>
        <View style={styles.viewEditable}>
          {documentId !== ''  && imgSelect.id !== 0 && (
            <TouchableOpacity style={styles.btnAddText} onPress={addText}>
              <Icon type="Feather" name="type" style={styles.iconEdit} />
            </TouchableOpacity>
          )}
          {documentId !== ''  && imgSelect.id !== 0 && (
            <TouchableOpacity
              style={styles.btnAllowScroll}
              onPress={() => {
                setEditable(!editable);
              }}
            >
              <Icon type="Feather" name="edit-2" style={styles.iconEdit} />
              <Text
                style={{
                  color: editable ? 'yellow' : 'white',
                  paddingBottom: 5,
                }}
              >
                {editable ? 'On' : 'Off'}
              </Text>
            </TouchableOpacity>
          )}
          {documentId !== '' && (
            <RNSketchCanvas
              ref={canvasRef}
              text={texts}
              localSourceImage={{
                filename: imgSelect.url,
                directory: SketchCanvas.MAIN_BUNDLE,
                mode: 'AspectFill',
              }}
              idx={imgSelect.url}
              strokeWidthChange={editable}
              containerStyle={styles.containerStyle}
              canvasStyle={[
                styles.canvasStyle,
                { width: imgSelect.sizeImage.width, height: imgSelect.sizeImage.height },
              ]}
              touchEnabled={editable}
              onStrokeEnd={() => {
                setActions([...actions, 0]);
                const arrImgs = [...listImgsEditing];
                const idx = arrImgs.findIndex(ele => ele.id === imgSelect.id);
                if (arrImgs[idx].opened !== true) {
                  arrImgs[idx].edited = true;
                  arrImgs[idx].opened = true;
                  setListImgEditing(arrImgs);
                }
              }}
              undoComponent={
                imgSelect.id === 0 ? (
                  <></>
                ) : (
                  <View style={[styles.functionButton, { top: 10 }]}>
                    <Icon type="Feather" name="rotate-ccw" style={styles.iconEdit} />
                  </View>
                )
              }
              onUndoPressed={() => {
                const actionsArr = [...actions];
                if (actionsArr[actionsArr.length - 1] === 1) {
                  const textsArr = [...texts];
                  textsArr.splice(textsArr.length - 1, 1);
                  setTexts(textsArr);
                }
                actionsArr.splice(actionsArr.length - 1, 1);
                setActions(actionsArr);
              }}
              clearComponent={
                imgSelect.id === 0 ? (
                  <></>
                ) : (
                  <View style={[styles.functionButton, { top: 60 }]}>
                    <Icon type="Feather" name="repeat" style={styles.iconEdit} />
                  </View>
                )
              }
              onClearPressed={() => {
                setTexts([]);
                setActions([]);
              }}
              defaultStrokeIndex={1}
              defaultStrokeWidth={0}
              savePreference={() => ({
                folder: 'RNSketchCanvas',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                includeImage: true,
                includeText: true,
                imageType: 'png',
              })}
              onSketchSaved={(success, path) => {
                onSketchSaved(success, path);
              }}
              onPathsChange={() => {}}
              onZoomScaleChange={nativeEventDragRes => {
                setNativeEventDrag(nativeEventDragRes);
              }}
              scrollable={!editable}
            />
          )}
          {(documentId === '' ) && <ViewImageSketch imgSelect={imgSelect} idx={imgSelect.url} />}
          {showInput && (documentId !== '' ) && (
            <View style={styles.inputField}>
              <TextInput
                style={styles.txtInput}
                maxLength={100}
                placeholder="Nhập text"
                placeholderTextColor="red"
                multiline
                onChangeText={text => onChangeText(text)}
              />
              {textEditing.length > 0 && (
                <Button
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    setShowDrag(true);
                    setShowInput(false);
                  }}
                >
                  <Text>OK</Text>
                </Button>
              )}
            </View>
          )}
          {showDrag && (documentId !== '' ) && (
            <Draggable
              renderColor="rgba(255, 247, 0, 0.8)"
              renderSize={50}
              multiLineText={formatTextEdit(textEditing, true)}
              scaleSize={nativeEventDrag.zoomScale}
              renderShape="square"
              renderText={textEditing}
              x={200}
              y={40}
              pressDragRelease={(e, gestureState) => {
                pressDragReleaseModal(e, gestureState);
              }}
            />
          )}
        </View>
        {documentId !== ''  && (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              backgroundColor: 'rgba(240, 240, 245, 0.54)',
            }}
          >
            <TuChoiContainer
              noteRequired
              tabletEditDocument
              documentId={documentId}
              onClickTuChoi={() => {
                if (imgSelect.edited === true) {
                  canvasRef.current.save();
                }
              }}
              onSubmitPress={() => {
                console.log('Tu choi khi xem van ban');
                setTimeout(() => {
                  closeModal();
                  DocumentNavigation.goToDuThaoCxl();
                }, 500);
              }}
              listImgs={listImgsEditing}
              label="Nhập lý do từ chối"
              actionName="Từ chối"
              borderColor="blue"
              icon={<Icon name="x-circle" type="Feather" style={{ color: 'red' }} />}
            />
            <Button
              block
              onPress={() => {
                reset();
                closeModal();
              }}
              style={styles.btnCancle}
            >
              <Text style={styles.btnTxtCancle} uppercase={false}>
                Huỷ
              </Text>
            </Button>
          </View>
        )}
        {documentId === '' && (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              backgroundColor: 'rgba(240, 240, 245, 0.54)',
            }}
          >
            <Button
              block
              onPress={() => {
                reset();
                closeModal();
              }}
              style={[styles.btnCancle, { backgroundColor: 'white' }]}
            >
              <Text style={styles.btnTxtCancle} uppercase={false}>
                Xác nhận
              </Text>
            </Button>
          </View>
        )}
        {/*{documentId !== ''  && (*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      flexDirection: 'row',*/}
        {/*      paddingVertical: 5,*/}
        {/*      backgroundColor: 'rgba(240, 240, 245, 0.54)',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Button*/}
        {/*      block*/}
        {/*      onPress={() => {*/}
        {/*        setShowView(false)*/}
        {/*      }}*/}
        {/*      style={[styles.btnCancle, { backgroundColor: 'white' }]}*/}
        {/*    >*/}
        {/*      <Text style={styles.btnTxtCancle} uppercase={false}>*/}
        {/*        Chỉnh sửa*/}
        {/*      </Text>*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      block*/}
        {/*      onPress={() => {*/}
        {/*        reset();*/}
        {/*        closeModal();*/}
        {/*      }}*/}
        {/*      style={[styles.btnCancle, { backgroundColor: 'white' }]}*/}
        {/*    >*/}
        {/*      <Text style={styles.btnTxtCancle} uppercase={false}>*/}
        {/*        Quay lại*/}
        {/*      </Text>*/}
        {/*    </Button>*/}
        {/*  </View>*/}
        {/*)}*/}
      </View>
    </Container>
  );
};

EditDocumentModal.propTypes = {
  closeModal: PropTypes.func,
  listImgs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  listImgDefault: PropTypes.arrayOf(PropTypes.shape({})),
  documentId: PropTypes.string,
  listPageNumberChange: PropTypes.arrayOf(PropTypes.number),
};
EditDocumentModal.defaultProps = {
  closeModal() {},
  documentId: '',
  listPageNumberChange: [],
  listImgDefault: [],
};

export default EditDocumentModal;
