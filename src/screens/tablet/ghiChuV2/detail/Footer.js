import { TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomIcon from '../components/CustomIcon';
import { TYPE } from '../../../../store/ghiChu/reducer';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import useFileUpload from 'eoffice/utils/useFileUpload';
import ModalLinkNote from '../components/ModalLinkNote';

const options = {
  title: 'Choose Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Footer = ({ addMore }) => {
  const [state, actions] = useFileUpload({ objectType: ATTACHMENT_TYPES.NOTE_RELATION });
  const [isOpen, setIsOpen] = useState(false);

  async function showImagePicker() {
    let res = await actions.upload(true);
    const upload = state.files.pop();
    if (res) {
      if (upload) {
        addMore({ type: TYPE.IMAGE, value: upload.id });
      }
    }
  }

  async function showFilePicker() {
    let res = await actions.upload(false);
    const upload = state.files.pop();
    if (res) {
      if (upload) {
        addMore({ type: TYPE.FILE, value: upload.id });
      }
    }
  }

  const addCalendar = item => {
    addMore({ type: TYPE.CALENDAR, value: item.caseMasterId });
    setIsOpen(false);
  };

  return (
    <View style={{ padding: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <CustomIcon name="calendar" margin={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showFilePicker()}>
          <CustomIcon name="paperclip" margin={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showImagePicker()}>
          <CustomIcon name="camera" margin={10} />
        </TouchableOpacity>
      </View>
      <ModalLinkNote isOpen={isOpen} close={() => setIsOpen(false)} addMore={addCalendar} />
    </View>
  );
};

export default Footer;
