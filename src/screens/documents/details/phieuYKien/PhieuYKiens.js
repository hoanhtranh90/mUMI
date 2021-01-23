import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { findPhieuYKien } from '../../../../store/documents/detail/service';
import PhieuYKien from './PhieuYKien';
import LabelTabDetailPhieuYKien from '../../../../components/Tablet/LabelTabDetailPhieuYKien';

const styles = StyleSheet.create({
  listWrapper: {
    paddingBottom: 15,
  },
});

const PhieuYKiens = ({ document }) => {
  const [relationDocs, setRelationDocs] = useState([]);
  const [isMinus, setIsMinus] = useState(DeviceInfo.isTablet());
  useEffect(
    () => {
      if (document !== null) {
        findPhieuYKien(document.id).then(res => {
          const response = res.data;
          setRelationDocs(response);
        });
      }
    },
    [document]
  );
  return (
    <>
      {relationDocs.length > 0 && (
        <>
          <LabelTabDetailPhieuYKien
            count={relationDocs.length}
            type={2}
            onPress={() => {
              setIsMinus(!isMinus);
            }}
            isMinus={isMinus}
          />
          {!isMinus && (
            <FlatList
              style={styles.listWrapper}
              data={relationDocs}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => <PhieuYKien idx={index} item={item} />}
            />
          )}
        </>
      )}
    </>
  );
};

PhieuYKiens.propTypes = {
  document: PropTypes.shape({
    quote: PropTypes.string,
  }),
};
PhieuYKiens.defaultProps = {
  document: {},
};

export default PhieuYKiens;
