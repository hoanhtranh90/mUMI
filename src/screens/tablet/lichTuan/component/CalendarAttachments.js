import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useDownload from '../../../../utils/useDownload';
import * as calendarService from '../../../../store/hcCalendar/service';

const Attachments = ({ hcCaseCalendar, isShowLabel }) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    loadAttachments().then(data => {
      if (isMounted) setAttachments(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const Attachment = ({ attachment }) => {
    const [
      downloadState,
      startDownload,
      startDownloadPdf,
      startDownloadRefere,
      startDownloadRelationDoc,
      startDownloadHcCalendar,
    ] = useDownload({});
    const downloadAttachment = (hcCaseCalendar, attachment) => {
      startDownloadHcCalendar(hcCaseCalendar.id, attachment);
    };
    return (
      <TouchableOpacity
        key={attachment.id}
        style={{
          width: '100%',
          backgroundColor: '#fff',
          height: 30,
        }}
        onPress={() => downloadAttachment(hcCaseCalendar, attachment)}
      >
        {!downloadState.downloadingPdf && !downloadState.opening && (
          <Text numberOfLines={1} style={{ textDecorationLine: 'underline', color: '#0088ff' }}>
            {attachment.fileName}
          </Text>
        )}
        {downloadState.downloadingPdf && (
          <Text numberOfLines={1} style={{ color: '#0088ff' }}>
            Đang tải ...
          </Text>
        )}
        {downloadState.opening && (
          <Text numberOfLines={1} style={{ color: '#0088ff' }}>
            Đang mở ...
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const loadAttachments = () => {
    return calendarService.getAttachmentHcCalendar(hcCaseCalendar);
  };

  if (attachments && attachments.length > 0) {
    return (
      <View>
        {isShowLabel && (
          <Text
            style={{
              fontWeight: 'bold',
              lineHeight: 25,
              fontSize: 16,
            }}
          >
            File đính kèm:{' '}
          </Text>
        )}
        <View style={{ flexDirection: 'column' }}>
          {attachments.map(attachment => (
            <Attachment attachment={attachment} key={attachment.id} />
          ))}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

Attachments.defaultProps = {
  isShowLabel: true,
};

export default Attachments;
