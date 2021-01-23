import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import format from 'date-fns/format';

import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import useDownloadV2 from "../../../../utils/useDownloadV2";

const RelatedDoc = (props) => {
  const { state, downloadRelationDocInTask } = useDownloadV2({ isOpen: true });
  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => downloadRelationDocInTask(props.taskId, props.docId)}>
      <View style={{ flex: 1, paddingRight: 20 }}>
        <Text style={{ color: colors.darkGray, fontSize: 17, fontWeight: 'bold' }}>{props.quote}</Text>
        <View style={{ paddingTop: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.gray, fontSize: 14 }}>{props.docCode}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="clock"
              type="MaterialCommunityIcons"
              style={{ color: colors.gray, fontSize: 15, width: 19 }}
            />
            <Text style={{ color: colors.gray, fontSize: 14 }}>
              {format(new Date(props.docDate), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <IconButton icon="eye" />
      </View>
    </TouchableOpacity>
  )
}

RelatedDoc.propTypes = {
  docCode: PropTypes.string.isRequired,
  docDate: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  quote: PropTypes.string.isRequired,
};

export default RelatedDoc;
