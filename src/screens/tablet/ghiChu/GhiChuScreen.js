import React, {useEffect, useState} from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import ListNote from "./body/ListNote";
import DetailNote from "./body/DetailNote";
import {addNewNote, TYPE, loadAllNotes} from "../../../store/ghiChu/reducer";
import {connect} from "react-redux";
import Orientation from 'react-native-orientation-locker';
import ModalLinkNote from "../ghiChuV2/components/ModalLinkNote";

const GhiChuScreen = ({ navigation, addNewNote }) => {
  Orientation.lockToLandscape();

  const [isOpen, setOpenModal] = useState(false)
  const detail = navigation.getParam('detail', '')
  const noteId = navigation.getParam('id', '')

  useEffect(() => {
    if (detail && detail.hcCaseCalendar) {
      addNewNote(detail.hcCaseCalendar.meetingTitle, detail.hcCaseCalendar.caseMasterId)
    }
  },[detail])

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <View style={styles.mainContent}>
      <ListNote addNewNote={addNewNote} noteId={noteId}/>
      <DetailNote openModal={() => setOpenModal(true)} addNewNote={addNewNote}/>
      <ModalLinkNote isOpen={isOpen} close={closeModal}/>
    </View>
  )
};



const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor : '#ffffff'
  },
});
const mapStateToProps = ({note}) => ({
});


const mapDispatchToProps = {
  addNewNote: addNewNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GhiChuScreen);
