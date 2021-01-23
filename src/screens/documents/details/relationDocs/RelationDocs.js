import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { findDocRelations } from '../../../../store/documents/detail/service';
import RelationDoc from './RelationDoc';
import LabelTabDetailRelatedDoc from '../../../../components/Tablet/LabelTabDetailRelatedDoc';
import LabelTabDetailRelatedDocAttach from '../../../../components/Tablet/LabelTabDetailRelatedDocAttach';
import LabelTabDetailRelatedDocNoAttach from '../../../../components/Tablet/LabelTabDetailRelatedDocNoAttach';
import _ from 'lodash';

const styles = StyleSheet.create({
  listWrapper: {
    paddingBottom: 15,
  },
});

const RelationDocs = ({ document }) => {
  const [relationDocs, setRelationDocs] = useState([]);
  const [attach, setAttach] = useState([]);
  const [noAttach, setNoActtach] = useState([]);
  const [isMinus, setIsMinus] = useState(DeviceInfo.isTablet());
  const [isMinusNoAttach, setIsMinusNoAttach] = useState(DeviceInfo.isTablet());
  useEffect(
    () => {
      if (document !== null) {
        findDocRelations(document.id).then(res => {
          const response = res.data;
          // console.log(response);
          // console.log(response.filter(data => data.attachedType === 1));
          // console.log(response.filter(data => data.attachedType === 0));
          setRelationDocs(response);
          setAttach(response.filter(data => data.attachedType === 0));
          setNoActtach(response.filter(data => data.attachedType === 1));
        });
      }
    },
    [document]
  );
  return (
    <>
      {relationDocs.length > 0 && _.isNull(relationDocs[0].attachedType) && (
        <>
          <LabelTabDetailRelatedDoc
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
              renderItem={({ item, index }) => <RelationDoc idx={index} item={item} />}
            />
          )}
        </>
      )}
      {noAttach.length > 0 && (
        <>
          <LabelTabDetailRelatedDocNoAttach
            count={noAttach.length}
            type={2}
            onPress={() => {
              setIsMinusNoAttach(!isMinusNoAttach);
            }}
            isMinusNoAttach={isMinusNoAttach}
          />
          {!isMinusNoAttach && (
            <FlatList
              style={styles.listWrapper}
              data={noAttach}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => <RelationDoc idx={index} item={item} />}
            />
          )}
        </>
      )}
      {attach.length > 0 && (
        <>
          <LabelTabDetailRelatedDocAttach
            count={attach.length}
            type={2}
            onPress={() => {
              setIsMinus(!isMinus);
            }}
            isMinusAttach={isMinus}
          />
          {!isMinus && (
            <FlatList
              style={styles.listWrapper}
              data={attach}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => <RelationDoc idx={index} item={item} />}
            />
          )}
        </>
      )}
    </>
  );
};

RelationDocs.propTypes = {
  document: PropTypes.shape({
    quote: PropTypes.string,
  }),
};
RelationDocs.defaultProps = {
  document: {},
};

export default RelationDocs;
