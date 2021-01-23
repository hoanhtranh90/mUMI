import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';

import colors from 'eoffice/utils/colors';
import Section from '../common/Section';
import RelatedDoc from './RelatedDoc';

const styles = {
  section: {
    paddingHorizontal: 15,
  },
  list: { paddingTop: 20 },
  separator: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginTop: 25,
    marginBottom: 20,
  },
};

const RelatedDocs = ({ relatedDocs, listRelatedDocs,task }) => {
  useEffect(() => {
    listRelatedDocs();
  }, []);

  return (
    <>
      <Section title={`${relatedDocs.length} tài liệu liên quan`} wrapperStyle={styles.section}>
        <FlatList
          contentContainerStyle={styles.list}
          data={relatedDocs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <RelatedDoc taskId={task.id} {...item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
        />
      </Section>
    </>
  );
};

RelatedDocs.propTypes = {
  listRelatedDocs: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  relatedDocs: PropTypes.arrayOf(PropTypes.shape({})),
};
RelatedDocs.defaultProps = {
  loading: false,
  relatedDocs: [],
};

export default RelatedDocs;
