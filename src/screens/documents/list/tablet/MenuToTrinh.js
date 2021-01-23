import React from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import StatRow from './StatRow';
import SubStatRow from './SubStatRow';
import { DOCUMENT_TYPE, DOC_USER_STATUS, DOC_STATUS_DISPLAY } from 'eoffice/constants/documents';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';

const MenuToTrinh = ({
  countToTrinh,
  resetDocuments,
  mode,
  typeOfActive,
  widthBar,
  onClickTypeOfBtn,
}) => {
  return (
    <>
      <StatRow
        typeOfActive={typeOfActive}
        typeOfBtn={DOC_USER_STATUS.TO_TRINH_CHUA_YK}
        widthBar={widthBar}
        showDot
        {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CHUA_YK]}
        onPress={() => {
          onClickTypeOfBtn(DOC_USER_STATUS.TO_TRINH_CHUA_YK);
          resetDocuments();
          DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_CHUA_YK);
        }}
      />
      <SubStatRow
        typeOfActive={typeOfActive}
        typeOfBtn={DOC_USER_STATUS.TO_TRINH_CXL}
        widthBar={widthBar}
        {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CXL]}
        onPress={() => {
          onClickTypeOfBtn(DOC_USER_STATUS.TO_TRINH_CXL);
          resetDocuments();
          DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_CXL);
        }}
      />
      <SubStatRow
        typeOfActive={typeOfActive}
        typeOfBtn={DOC_USER_STATUS.TO_TRINH_DBL}
        widthBar={widthBar}
        {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DBL]}
        onPress={() => {
          onClickTypeOfBtn(DOC_USER_STATUS.TO_TRINH_DBL);
          resetDocuments();
          DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_DBL);
        }}
      />
      <SubStatRow
        typeOfActive={typeOfActive}
        typeOfBtn={DOC_USER_STATUS.TO_TRINH_DCXL}
        widthBar={widthBar}
        {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DCXL]}
        onPress={() => {
          onClickTypeOfBtn(DOC_USER_STATUS.TO_TRINH_DCXL);
          resetDocuments();
          DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_DCXL);
        }}
      />
    </>
  );
};

export default MenuToTrinh;
