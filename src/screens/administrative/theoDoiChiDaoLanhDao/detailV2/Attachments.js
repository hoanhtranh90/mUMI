import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Button, Spinner, Text} from 'native-base';
import colors from 'eoffice/utils/colors';
import Attachment from 'eoffice/screens/tasks/details/info/Attachments/Attachment';
import {DOCUMENT_TYPE, TASK_UPLOAD} from 'eoffice/constants/documents'
import FileIcon from 'eoffice/components/FileIcon';
import { formatDate } from 'eoffice/utils/utils';
import useDownload from 'eoffice/utils/useDownload';
import {getDocument} from 'eoffice/store/documents/detail/logics';

const AttachDocuments = ({item}) => {
  const [detail, setDetail] = useState({})
  const [downloadState, startDownload, startDownloadPdf, startDownloadRefere] = useDownload({
    attachmentId: detail?.file?.id,
    fileName: detail?.file?.fileName,
    open: true,
    documentId: item?.id,
  });

  // useEffect(() => {
  //   getDocumentDetail()
  // },[])
  //
  // async function getDocumentDetail() {
  //   const tempDetail = await getDocument(DOCUMENT_TYPE.VB_DI,item.referenceObjectId)
  //   setDetail(tempDetail)
  // }
  return (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() => {
        //startDownload();
      }}
      disabled={downloadState.downloading || downloadState.opening}
    >
      <View style={{backgroundColor: colors.lighterGray, borderRadius: 8, width: 45, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
        <FileIcon ext={"json"} style={{color: colors.blue, fontSize: 25, marginTop: 0, paddingRight: 0,}} />
      </View>
      <View style={{paddingLeft: 15, flexDirection: 'column', justifyContent: 'space-around',}}>
        <Text style={{fontSize: 17, fontWeight: '500', color: colors.darkGray,}} numberOfLines={1}>
          {item.quote}
        </Text>
        <Text style={{fontSize: 15, color: colors.gray,}}>{formatDate(new Date(item.createTime))}</Text>
      </View>
      {downloadState.downloading && (
        <Spinner size="small" style={{height: null, marginRight: 10,}} color="white" />
      )}
    </TouchableOpacity>
  );
}

const Attachments = ({attachments, mode}) => {
  return (
    <FlatList
      style={{marginTop: 8}}
      contentContainerStyle={{ paddingLeft: 5 }}
      data={attachments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AttachDocuments item={item}/>}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListEmptyComponent={
        <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
          { mode === TASK_UPLOAD.FILE_UPLOAD ? "Không có file đính kèm" : "Không có văn bản đính kèm"}
        </Text>
      }
    />
  );
};

Attachments.propTypes = {
  listAttachments: PropTypes.func.isRequired,

  attachments: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  mode: PropTypes.string,
};
Attachments.defaultProps = {
  attachments: [],
  loading: false,
};

export default Attachments;
