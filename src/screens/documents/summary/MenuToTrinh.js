import React, { useEffect, useState } from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import StatRow from './StatRow';
import SubStatRow from './SubStatRow';
import { DOCUMENT_TYPE, DOC_USER_STATUS, DOC_STATUS_DISPLAY } from 'eoffice/constants/documents';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import { convertQueryToTrinhQuaHan } from '../../../utils/utils';
import * as service from '../../../store/documents/list/service';
import moment from 'moment';

const MenuToTrinh = ({ resetDocuments }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    loadCountToTrinh();
  }, []);

  const loadCountToTrinh = async () => {
    let fromDate = moment()
      .startOf('day')
      .subtract(5, 'days')
      .subtract(3, 'months')
      .toDate();
    let toDate = moment()
      .startOf('day')
      .subtract(5, 'days')
      .toDate();
    const listCount = await Promise.all(
      [
        DOC_USER_STATUS.TO_TRINH_CHUA_YK,
        DOC_USER_STATUS.TO_TRINH_DCXL,
        DOC_USER_STATUS.TO_TRINH_DBL,
        DOC_USER_STATUS.TO_TRINH_CXL,
      ].map(type => {
        const { toTrinhQuaHan, isCommented, status } = convertQueryToTrinhQuaHan(type);
        return service
          .findAllToTrinhQuaHanCount({
            status: status,
            docDate: [fromDate, toDate],
            keyword: '',
            isRead: null,
            toTrinhQuaHan,
            isCommented,
          })
          .then(res => ({ [type]: res.data }));
      })
    );
    let count1 = listCount.reduce((hash, item) => ({ ...hash, ...item }), {});
    setCount(count1);
  };

  return (
    <>
      <Row>
        <StatRow
          {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CHUA_YK]}
          count={count ? count[DOC_USER_STATUS.TO_TRINH_CHUA_YK] : 1}
          bgColor="red"
          color="#fff"
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_CHUA_YK);
          }}
          hasCount={true}
        />
      </Row>
      <Row style={{ height: 50 }}>
        <SubStatRow
          {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_CXL]}
          count={count ? count[DOC_USER_STATUS.TO_TRINH_CXL] : 0}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_CXL);
          }}
          hasCount={true}
        />
      </Row>
      <Row style={{ height: 50 }}>
        <SubStatRow
          {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DBL]}
          count={count ? count[DOC_USER_STATUS.TO_TRINH_DBL] : 0}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_DBL);
          }}
          hasCount={true}
        />
      </Row>
      <Row style={{ height: 50 }}>
        <SubStatRow
          {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.TO_TRINH_DCXL]}
          count={count ? count[DOC_USER_STATUS.TO_TRINH_DCXL] : 0}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToToTrinh(DOC_USER_STATUS.TO_TRINH_DCXL);
          }}
          hasCount={true}
        />
      </Row>
    </>
  );
};

export default MenuToTrinh;
